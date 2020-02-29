export const startCash = 50;
export const maxPlayers = 5;
export const modes = {
  Easy: 3,
  Medium: 2,
  Hard: 1.5,
  Outrageous: 1
};

const suits = ["Spades", "Hearts", "Diamonds", "Clubs"],
  values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export const createDeck = () => {
  const deck = new Array();

  for (const val of values) {
    for (const suit of suits) {
      let weight = parseInt(val);
      if (val === "J" || val === "Q" || val === "K") weight = 10;
      if (val === "A") weight = 11;
      deck.push({ Value: val, Suit: suit, Weight: weight });
    }
  }

  shuffleDeck(deck);
  return deck;
};

const shuffleDeck = deck => {
  for (let i = 0; i < 1000; i++) {
    const one = Math.floor(Math.random() * deck.length),
      two = Math.floor(Math.random() * deck.length),
      temp = deck[one];

    deck[one] = deck[two];
    deck[two] = temp;
  }
};

export const houseHit = house => {
  if (calcTotalPoints(house) > 16) return false;
  else return true;
};

export const calcTotalPoints = hand => {
  return hand.reduce((acm, val) => (acm += val.Weight), 0);
};

export const checkLivePlayers = players => {
  return players.filter(player => player.Cash !== "Broke!").length;
};

// --------------------------- OLD --------------------------- //

export const createPlayer = num => {
  const players = new Array();

  for (let i = 1; i <= num; i++) {
    players.push({ Name: `Player ${i}`, ID: i, Points: 0, Hand: new Array() });
  }

  return players;
};

export const win = players => {
  const best = [0, -1];

  players.forEach((player, idx) => {
    if (player.Points > best[0] && player.Points < 22)
      best = [player.Points, idx];
  });

  return best[1] === -1 ? null : best[1];
};
