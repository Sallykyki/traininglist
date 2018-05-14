import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <p>Hello, I'm Huong Pham. My student number is 1600026.</p>
          <p>
            This is project for Personal Trainer company which manages info
            about their customers and trainings. This web app contains 4 pages:
          </p>
          <ul>
            <li>
              <Link to="/gettraining">Customers &#38; Trainings page </Link>
              shows the relationship between customers and trainings.
            </li>
            <li>
              <Link to="/customer">Customers page</Link> shows info of
              customers.
            </li>
            <li>
              <Link to="/training">Trainings page</Link> shows info of
              trainings.
            </li>
            <li>
              <Link to="/calendar">Calendar page</Link> shows schedule of
              trainings.
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
