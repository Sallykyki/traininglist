import React, { Component } from "react";
import SkyLight from "react-skylight";
import moment from "moment";

class AddTraining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      activity: "",
      duration: "",
      customer: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newTraining = {
      date: moment(
        this.state.date,
        moment.HTML5_FMT.DATETIME_LOCAL
      ).toISOString(),
      activity: this.state.activity,
      duration: this.state.duration,
      customer:
        "https://customerrest.herokuapp.com/api/customers/" +
        this.state.customer
    };
    this.props.addTraining(newTraining);
    this.setState({
      date: "",
      activity: "",
      duration: "",
      customer: ""
    });
    this.simpleDialog.hide();
  };
  render() {
    return (
      <div>
        <SkyLight
          hideOnOverlayClicked
          ref={ref => (this.simpleDialog = ref)}
          title="Add training"
        >
          <form>
            <div className="form-group">
              <input
                placeholder="Date"
                className="form-control"
                name="date"
                type="datetime-local"
                value={this.state.date}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Activity"
                className="form-control"
                name="activity"
                value={this.state.activity}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Duration"
                className="form-control"
                name="duration"
                value={this.state.duration}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Customer id"
                className="form-control"
                name="customer"
                value={this.state.customer}
                onChange={this.handleChange}
              />
            </div>
            <button className="btn btn-primary" onClick={this.handleSubmit}>
              Save
            </button>
          </form>
        </SkyLight>
        <button
          style={{ margin: 10 }}
          className="btn btn-primary"
          onClick={() => {
            this.simpleDialog.show();
          }}
        >
          Add training
        </button>
      </div>
    );
  }
}

export default AddTraining;
