import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Home</h1>
        </header>
        <Link to="/customer">Customer list</Link>
        <Link to="/training">Training list</Link>
      </div>
    );
  }
}

export default Home;
