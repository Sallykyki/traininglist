import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Traininglist extends Component {
  state = { trainings: [] };

  componentDidMount() {
    this.loadTrainings();
  }

  loadTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          trainings: responseData
        });
      });
  };
  render() {
    let trainings = this.state.trainings;

    trainings.map(t => {
      t.date = new Date(t.date).toDateString();
      t.customer.address = `${t.customer.streetaddress}  
        ${t.customer.postcode}`;
    });

    return (
      <div className="container">
        <ReactTable
          data={trainings}
          filterable
          columns={[
            {
              Header: "Trainings ",
              columns: [
                {
                  Header: "Id",
                  accessor: "id",
                  maxWidth: 50
                },
                {
                  Header: "Activity",
                  accessor: "activity"
                },
                {
                  Header: "Date",
                  accessor: "date",
                  width: 200
                },
                {
                  Header: "Duration",
                  accessor: "duration"
                }
              ]
            },
            {
              Header: "Customer ",
              columns: [
                {
                  Header: "Id",
                  accessor: "customer.id",
                  maxWidth: 50
                },
                {
                  Header: "First name",
                  accessor: "customer.firstname"
                },
                {
                  Header: "Last name",
                  accessor: "customer.lastname"
                },
                {
                  Header: "Email",
                  accessor: "customer.email",
                  width: 200
                },
                {
                  Header: "Phone",
                  accessor: "customer.phone",
                  width: 150
                },
                {
                  Header: "Address",
                  accessor: "customer.address",
                  minWidth: 200
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default Traininglist;
