import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import AddCustomer from "./AddCustomer";

class Customer extends Component {
  state = { customers: [], trainings: [] };

  componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          customers: responseData.content
        });
      });
  };

  addCustomer = newCustomer => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer)
    })
      .then(res => this.loadCustomers())
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
              .then(res => this.loadCustomers())
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
    const { customers } = this.state;
    console.log(customers);
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
        <AddCustomer addCustomer={this.addCustomer} />
        <ReactTable
          data={customers}
          filterable
          columns={[
            {
              Header: "First Name",
              accessor: "firstname"
            },
            {
              Header: "Last Name",
              accessor: "lastname"
            },
            {
              Header: "Street address",
              accessor: "Street address"
            },
            {
              Header: "Post code",
              accessor: "postcode"
            },
            {
              Header: "Email",
              accessor: "email"
            },
            {
              Header: "Phone",
              accessor: "phone"
            },
            {
              id: "button",
              sortabble: false,
              filerable: false,
              accessor: "links",
              Cell: ({ value }) => (
                <button
                  className="btn btn-default btn-link del-link"
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
          defaultPageSize={10}
        />
      </div>
    );
  }
}

export default Customer;
