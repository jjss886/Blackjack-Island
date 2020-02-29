import React, { Component } from "react";
import { connect } from "react-redux";
import Player from "./Player";
import House from "./House";

class Table extends Component {
  render() {
    const { deck, players, livePlayer, liveGame } = this.props;

    return (
      <div className="tableFullDiv">
        <div className="cardSecDiv">
          <div className="cardDiv" style={{ backgroundColor: "gold" }}>
            <strong>{deck.length}</strong>
          </div>

          {liveGame ? <House /> : null}
        </div>

        <div className="playerSecDiv">
          {players.length
            ? players.map((player, idx) => (
                <Player key={idx} player={player} live={idx === livePlayer} />
              ))
            : null}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    deck: state.deck,
    players: state.players,
    livePlayer: state.livePlayer,
    liveGame: state.liveGame
  };
};

export default connect(mapState)(Table);
