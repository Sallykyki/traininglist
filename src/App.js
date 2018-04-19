import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Traininglist from "./Traininglist";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Training list</h1>
        </header>
        <Traininglist />
      </div>
    );
  }
}

export default App;
