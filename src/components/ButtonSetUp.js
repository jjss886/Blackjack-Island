import React, { Component } from "react";
import { connect } from "react-redux";
import { maxPlayers, modes, checkLivePlayers } from "../utils/utilities";
import {
  addPlayer,
  startGame,
  reset,
  hit,
  stay,
  newRound,
  houseCardDraw
} from "../store";

class ButtonSetUp extends Component {
  constructor() {
    super();
    this.state = {
      mode: "Easy"
    };
  }

  componentDidUpdate(prevProps) {
    const { liveRound } = this.props;
    if (liveRound && liveRound !== prevProps.liveRound) this.hitTimer();
  }

  handleModeChange = evt => {
    const mode = evt.target.value;
    this.setState({ mode });
  };

  newPlayer = () => {
    this.props.addPlayer();
  };

  maxPlayer = () => {
    alert("Already max number of players !");
  };

  startGame = () => {
    if (!this.props.players.length) return alert("Add Some Players First!");
    this.props.startGame(this.state.mode);
  };

  setNewRound = () => {
    const { players, newRound } = this.props;
    newRound(players);
  };

  resetGame = () => {
    clearInterval(this.hitInterval);
    this.props.reset();
  };

  hitTimer = () => {
    const { mode } = this.props;
    this.hitInterval = setInterval(this.hit, modes[mode] * 1000);
  };

  hit = () => {
    const { deck, livePlayer, players, hit, house, houseCardDraw } = this.props,
      nextCard = deck.slice(-1)[0],
      newScore = players[livePlayer].Points + nextCard.Weight,
      nextPlayer = newScore >= 21 && livePlayer < players.length - 1 ? 1 : 0;

    hit(deck.slice(), livePlayer, players.slice(), nextPlayer);

    if (livePlayer === players.length - 1 && newScore >= 21) {
      clearInterval(this.hitInterval);
      houseCardDraw(deck.slice(), house.slice(), players.slice());
    }
  };

  stay = () => {
    const {
      livePlayer,
      players,
      stay,
      houseCardDraw,
      house,
      deck
    } = this.props;
    if (livePlayer === players.length - 1) {
      clearInterval(this.hitInterval);
      houseCardDraw(deck.slice(), house.slice(), players.slice());
    } else stay();
  };

  calcPos = num => {
    return Math.floor(Math.random() * num);
  };

  render() {
    const { liveGame, liveRound, players } = this.props;

    return (
      <div className="btnSetUpDiv">
        {!liveGame ? (
          <>
            {players.length < maxPlayers ? (
              <button
                type="button"
                onClick={this.newPlayer}
                className="addPlayerBtn setUpBtn"
              >
                Add Player
              </button>
            ) : (
              <button
                type="button"
                onClick={this.maxPlayer}
                className="maxPlayerBtn setUpBtn"
              >
                Max Players
              </button>
            )}

            <select
              className="selectMode"
              value={this.state.mode}
              onChange={this.handleModeChange}
            >
              {Object.keys(modes).map((mode, idx) => (
                <option key={idx}>{mode}</option>
              ))}
            </select>

            <button
              type="button"
              onClick={this.startGame}
              className="startGameBtn setUpBtn"
            >
              Start Game
            </button>
          </>
        ) : (
          <>
            {liveRound ? (
              <>
                <button
                  type="button"
                  onClick={this.stay}
                  style={{ top: this.calcPos(400), left: this.calcPos(800) }}
                  className="stayMoveBtn setUpBtn"
                >
                  Stay Move
                </button>
              </>
            ) : null}

            {checkLivePlayers(players) ? (
              <button
                type="button"
                onClick={this.setNewRound}
                className="nextRoundBtn setUpBtn"
              >
                Next Round
              </button>
            ) : null}

            <button
              type="button"
              onClick={this.resetGame}
              className="resetBtn setUpBtn"
            >
              Full Reset
            </button>
          </>
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    deck: state.deck,
    players: state.players,
    liveGame: state.liveGame,
    livePlayer: state.livePlayer,
    liveRound: state.liveRound,
    house: state.house,
    mode: state.mode
  };
};

const mapDispatch = dispatch => {
  return {
    addPlayer: () => dispatch(addPlayer()),
    startGame: mode => dispatch(startGame(mode)),
    reset: () => dispatch(reset()),
    hit: (deck, idx, players, nextPlayer) =>
      dispatch(hit(deck, idx, players, nextPlayer)),
    stay: () => dispatch(stay()),
    newRound: players => dispatch(newRound(players)),
    houseCardDraw: (deck, house, players) =>
      dispatch(houseCardDraw(deck, house, players))
  };
};

export default connect(mapState, mapDispatch)(ButtonSetUp);
