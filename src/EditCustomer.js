import React, { Component } from "react";
import SkyLight from "react-skylight";
import Home from "./Home";

class EditCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.customer.firstname,
      lastname: this.props.customer.lastname,
      streetaddress: this.props.customer.streetaddress,
      postcode: this.props.customer.postcode,
      email: this.props.customer.email,
      phone: this.props.customer.phone
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const customer = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      streetaddress: this.state.streetaddress,
      postcode: this.state.postcode,
      email: this.state.email,
      phone: this.state.phone
    };
    this.props.updateCustomer(this.props.link, customer);
    this.simpleDialog.hide();
  };
  render() {
    return (
      <div>
        <SkyLight
          hideOnOverlayClicked
          ref={ref => (this.simpleDialog = ref)}
          title="Edit customer"
        >
          <form>
            <div className="form-group">
              <input
                placeholder="First name"
                className="form-control"
                name="firstname"
                onChange={this.handleChange}
                value={this.state.firstname}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Last name"
                className="form-control"
                name="lastname"
                onChange={this.handleChange}
                value={this.state.lastname}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Street Address"
                className="form-control"
                name="streetaddress"
                onChange={this.handleChange}
                value={this.state.streetaddress}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Post code"
                className="form-control"
                name="postcode"
                onChange={this.handleChange}
                value={this.state.postcode}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Email"
                className="form-control"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Phone"
                className="form-control"
                name="phone"
                onChange={this.handleChange}
                value={this.state.phone}
              />
            </div>
            <button className="btn btn-primary" onClick={this.handleSubmit}>
              Save
            </button>
          </form>
        </SkyLight>
        <button
          className="btn btn-default edit-link"
          onClick={() => {
            this.simpleDialog.show();
          }}
        >
          Edit
        </button>
      </div>
    );
  }
}

export default EditCustomer;
