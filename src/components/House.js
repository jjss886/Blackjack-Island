import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "./Card";

class House extends Component {
  render() {
    const { house, liveRound } = this.props;

    return (
      <div className="houseFullDiv">
        {house.map((card, idx) => (
          <Card key={idx} card={card} cover={idx === 0 && liveRound} />
        ))}
      </div>
    );
  }
}

const mapState = state => {
  return { house: state.house, liveRound: state.liveRound };
};

export default connect(mapState)(House);
