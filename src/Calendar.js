import React, { Component } from "react";
import { Link } from "react-router-dom";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

BigCalendar.momentLocalizer(moment);

class Calender extends Component {
  state = { trainings: [] };

  componentDidMount() {
    this.loadTrainings();
  }

  loadTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then(response => response.json())
      .then(responseData => {
        responseData.content.map(d => {
          d.title = d.activity;
          d.startDate = new Date(d.date);
          d.endDate = new Date(d.date);
          d.endDate.setMinutes(d.endDate.getMinutes() + d.duration);
        });
        return responseData.content;
      })
      .then(responseContent => {
        this.setState({
          trainings: responseContent
        });
      });
  };
  render() {
    const { trainings } = this.state;
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
        <div className="container">
          <BigCalendar
            defaultDate={new Date()}
            events={trainings}
            views={["month", "week", "day"]}
            startAccessor="startDate"
            endAccessor="endDate"
          />
        </div>
      </div>
    );
  }
}
export default Calender;
