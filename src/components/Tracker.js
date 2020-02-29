import React, { Component } from "react";
import { connect } from "react-redux";

class Tracker extends Component {
  render() {
    const { players } = this.props;

    return (
      <div className="trackerFullDiv">
        <h3>Money Tracker!</h3>

        <hr className="trackerHR" />

        {players.length ? (
          players.map((player, idx) => (
            <span key={idx} className="trackPlayer">
              <strong>{player.Name}</strong>: {!isNaN(player.Cash) ? "$" : null}
              {player.Cash}
            </span>
          ))
        ) : (
          <span className="trackPlayer">No Players</span>
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    players: state.players
  };
};

export default connect(mapState)(Tracker);
