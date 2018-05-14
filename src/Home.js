import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light ">
          <a class="navbar-brand" href="#">
            Personal Trainer
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item ">
                <Link to="/customer" className="nav-link">
                  Customer list
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/training" className="nav-link">
                  Training list
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/calendar" className="nav-link">
                  Calendar
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Home;
