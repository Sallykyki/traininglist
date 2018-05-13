import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AddTraining from "./AddTraining";

class Training extends Component {
  state = { trainings: [] };

  componentDidMount() {
    this.loadTrainings();
  }

  loadTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          trainings: responseData.content
        });
      });
  };

  addTraining = newTraining => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTraining)
    })
      .then(res => this.loadTrainings())
      .catch(err => console.error(err));
  };

  onDelClick = idLink => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(idLink, { method: "DELETE" })
              .then(res => this.loadTrainings())
              .catch(err => console.error(err));

            toast.success("Delete succeed", {
              position: toast.POSITION.BOTTOM_LEFT
            });
          }
        },
        {
          label: "No"
        }
      ]
    });
  };

  render() {
    const { trainings } = this.state;
    trainings.map(t => {
      t.date = new Date(t.date).toDateString();
    });
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Training list</h1>
        </header>
        <AddTraining addTraining={this.addTraining} />
        <ReactTable
          data={trainings}
          filterable
          columns={[
            {
              Header: "Activity",
              accessor: "activity"
            },
            {
              Header: "Date",
              accessor: "date"
            },
            {
              Header: "Duration",
              accessor: "duration"
            },
            {
              id: "button",
              sortabble: false,
              filerable: false,
              accessor: "links",
              Cell: ({ value }) => (
                <button
                  className="btn btn-default btn-link"
                  onClick={() => {
                    const link = value.find(l => l.rel === "self");
                    this.onDelClick(link.href);
                  }}
                >
                  Delete
                </button>
              )
            }
          ]}
        />
      </div>
    );
  }
}

export default Training;
