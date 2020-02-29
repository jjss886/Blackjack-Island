import React, { Component } from "react";
import { connect } from "react-redux";
import { setHouseDone, newRound } from "../store";
import { checkLivePlayers } from "../utils/utilities";

class EndMessage extends Component {
  closeMsg = () => {
    this.props.setHouseDone();
  };

  nextRound = () => {
    const { newRound, players } = this.props;
    newRound(players);
  };

  render() {
    const { houseDone, players } = this.props;

    return houseDone ? (
      <div className="endMsgFullDiv">
        <div className="endMsgInside">
          <div className="msgTextDiv">
            <h3 className="msgTextHeader">End of Round!</h3>

            {players.map((player, idx) => (
              <MsgText key={idx} player={player} />
            ))}
          </div>

          <div className="engMsgBtnDiv">
            <button type="button" className="endMsgBtn" onClick={this.closeMsg}>
              View Results
            </button>

            {checkLivePlayers(players) ? (
              <button
                type="button"
                className="endMsgBtn"
                onClick={this.nextRound}
              >
                Next Round
              </button>
            ) : null}
          </div>
        </div>
      </div>
    ) : null;
  }
}

const mapState = state => {
  return {
    house: state.house,
    houseDone: state.houseDone,
    players: state.players
  };
};

const mapDispatch = dispatch => {
  return {
    setHouseDone: () => dispatch(setHouseDone()),
    newRound: players => dispatch(newRound(players))
  };
};

export default connect(mapState, mapDispatch)(EndMessage);

// ---------------------- Message Text ---------------------- //

const MsgText = ({ player }) => {
  const { Name, Status } = player,
    msgObj = {
      Blackjack: ["hit the Jackpot! NICE (+$15)", true],
      Won: ["beat the House! (+$10)", true],
      Busted: ["busted! HA (-$10)", false],
      Lost: ["crushed by the House! (-$10)", false],
      Out: ["is broke! BYE", false]
    };

  return (
    <span className={`msgText msgText${msgObj[Status][1]}`}>
      {Name} {msgObj[Status][0]}
    </span>
  );
};
