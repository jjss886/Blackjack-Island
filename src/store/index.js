import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  createDeck,
  houseHit,
  calcTotalPoints,
  startCash
} from "../utils/utilities";

// INITIAL STATE
const initialState = {
  deck: [],
  house: [],
  players: [],
  livePlayer: -1,
  liveRound: false,
  liveGame: false,
  houseDone: false,
  mode: "Easy"
};

// ACTION TYPES
const ADD_PLAYER = "ADD_PLAYER";
const SET_GAME = "SET_GAME";
const SET_HOUSE = "SET_HOUSE";
const SET_HOUSE_DONE = "SET_HOUSE_DONE";
const NEW_ROUND = "NEW_ROUND";
const RESET = "RESET";
const HIT = "HIT";
const STAY = "STAY";
const SET_MODE = "SET_MODE";

// ACTION CREATORS

export const addPlayer = () => {
  const idx = store.getState().players.length + 1,
    player = {
      Name: `Player ${idx}`,
      ID: idx,
      Points: 0,
      Cash: startCash,
      Status: false,
      Hand: new Array()
    };

  return {
    type: ADD_PLAYER,
    player
  };
};

export const startGame = mode => {
  const deck = createDeck(),
    cardOne = deck.pop(),
    cardTwo = deck.pop(),
    house = [cardOne, cardTwo];

  return {
    type: SET_GAME,
    deck,
    house,
    mode
  };
};

export const reset = () => {
  return {
    type: RESET
  };
};

export const hit = (deck, idx, players, livePlayer) => {
  const card = deck.pop(),
    newPoints = players[idx].Points + card.Weight;

  players[idx].Hand.push(card);
  players[idx].Points = newPoints;

  return {
    type: HIT,
    deck,
    players,
    livePlayer
  };
};

export const stay = () => {
  return {
    type: STAY
  };
};

export const newRound = players => {
  const resetPlayers = players.reduce((acm, val) => {
      if (val.Cash > 0) {
        acm.push({
          Name: `Player ${val.Name.split(" ")[1]}`,
          ID: val.ID,
          Points: 0,
          Cash: val.Cash,
          Status: false,
          Hand: new Array()
        });
      }
      return acm;
    }, []),
    deck = createDeck(),
    cardOne = deck.pop(),
    cardTwo = deck.pop(),
    house = [cardOne, cardTwo];

  return {
    type: NEW_ROUND,
    players: resetPlayers,
    deck,
    house
  };
};

export const houseCardDraw = (deck, house, players) => {
  while (houseHit(house)) {
    house.push(deck.pop());
  }
  const housePoints = calcTotalPoints(house);
  players.forEach(player => {
    if (player.Points > 21) {
      player.Status = "Busted";
      player.Cash -= 10;
      if (player.Cash <= 0) {
        player.Cash = "Broke!";
        player.Status = "Out";
      }
    } else if (player.Points === 21) {
      player.Status = "Blackjack";
      player.Cash += 15;
    } else if (housePoints > 21 || player.Points > housePoints) {
      player.Status = "Won";
      player.Cash += 10;
    } else if (player.Points <= housePoints) {
      player.Status = "Lost";
      player.Cash -= 10;
      if (player.Cash <= 0) {
        player.Cash = "Broke!";
        player.Status = "Out";
      }
    }
  });

  return {
    type: SET_HOUSE,
    house,
    players
  };
};

export const setHouseDone = () => {
  return {
    type: SET_HOUSE_DONE
  };
};

export const setMode = mode => {
  return {
    type: SET_MODE,
    mode
  };
};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      return { ...state, players: [...state.players, action.player] };
    case SET_GAME:
      return {
        ...state,
        deck: action.deck,
        house: action.house,
        liveGame: !state.liveGame,
        livePlayer: 0,
        liveRound: true,
        mode: action.mode
      };
    case HIT:
      return {
        ...state,
        deck: action.deck,
        players: action.players,
        livePlayer: state.livePlayer + action.livePlayer
      };
    case STAY:
      return { ...state, livePlayer: state.livePlayer + 1 };
    case NEW_ROUND:
      return {
        ...state,
        deck: action.deck,
        house: action.house,
        players: action.players,
        livePlayer: 0,
        liveRound: true,
        houseDone: false
      };
    case SET_HOUSE:
      return {
        ...state,
        house: action.house,
        players: action.players,
        houseDone: true,
        liveRound: false
      };
    case SET_HOUSE_DONE:
      return {
        ...state,
        houseDone: false
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

const middleware = composeWithDevTools();
// applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
// applyMiddleware(thunkMiddleware)
// applyMiddleware(createLogger({ collapsed: true }));

const store = createStore(reducer, middleware);

export default store;
