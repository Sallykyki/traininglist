import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import Navbar from "./Navbar";

BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
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
        <Navbar />
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
export default Calendar;
