import React from "react";

const suitSymbols = {
  Spades: [9824, "&spades;", "Black"],
  Clubs: [9827, "&clubs;", "Black"],
  Hearts: [9829, "&hearts;", "Red"],
  Diamonds: [9830, "&diams;", "Red"]
};

const Card = ({ card, cover }) => (
  <div className={`cardDiv cardColor${suitSymbols[card.Suit][2]}`}>
    {cover ? (
      <div className="cardCoverDiv">
        <span className="coveredText">Covered!</span>
      </div>
    ) : (
      <>
        <span>{card.Value}</span>
        <span>{String.fromCharCode(suitSymbols[card.Suit][0])}</span>
      </>
    )}
  </div>
);

export default Card;
