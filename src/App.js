import React, { Component } from "react";
import "./App.css";
import Home from "./Home";
import Customer from "./Customer";
import Training from "./Training";
import Calendar from "./Calendar";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/customer" component={Customer} />
          <Route exact path="/training" component={Training} />
          <Route exact path="/calendar" component={Calendar} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
