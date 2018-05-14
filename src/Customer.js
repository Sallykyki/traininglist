import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Navbar from "./Navbar";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

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

  updateCustomer = (link, customer) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer)
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
        <Navbar />
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
              accessor: "streetaddress"
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
              Cell: ({ row, value }) => {
                const link = value.find(l => l.rel === "self");
                return (
                  <EditCustomer
                    updateCustomer={this.updateCustomer}
                    link={link.href}
                    customer={row}
                  />
                );
              }
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
        <ToastContainer />
      </div>
    );
  }
}

export default Customer;
