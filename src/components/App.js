import React from "react";
import Tracker from "./Tracker";
import Table from "./Table";
import ButtonSetUp from "./ButtonSetUp";
import EndMessage from "./EndMessage";

const App = () => (
  <div className="appFullDiv">
    <EndMessage />

    <h2 className="appHeader">
      Welcome to Blackjack Island, where you're constantly{" "}
      <span className="appHit">Hitting</span> and{" "}
      <span className="appStay">Staying</span> is constantly moving!
    </h2>

    <div className="appRow">
      <Table />

      <div className="appCol">
        <ButtonSetUp />

        <Tracker />
      </div>
    </div>
  </div>
);

export default App;
