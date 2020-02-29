import React from "react";
import Card from "./Card";

const Player = ({ player, live }) => {
  return (
    <div className={`playerDiv livePlayer${live}`}>
      {player.Points > 21 ? (
        <div className="bustedDiv">
          <span className="bustedText">BUSTED !</span>
        </div>
      ) : null}

      <h2>{player.Name}</h2>

      <span>Hand Total: {player.Points}</span>

      <div className="playerHandDiv">
        {player.Hand.length
          ? player.Hand.map((card, idx) => (
              <Card key={idx} card={card} cover={false} />
            ))
          : null}
      </div>
    </div>
  );
};

export default Player;
