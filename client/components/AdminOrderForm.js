import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editOrder } from '../store';
import { Link } from 'react-router-dom';

class AdminOrderForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderFilter: '',
    };
  }

  // Edits product corresponding to editProductForm.select when form is submitted, changing fields with new values.
  submitEditOrder = (event) => {
    event.preventDefault();
    let orderChanges = {
      status: event.target.orderStatus.value,
    };
    this.props.editOrderInfo(event.target.orderSelect.value, orderChanges);
  };

  changeStatus = (event) => {
    this.setState({ orderFilter: event.target.value });
  }

  render() {

    if (!this.props.orders) return (<div />);
    return (
      <div className="container">
        <h5 className="col-md-3">Filter by Status:</h5>
        <form className="col-md-6">
          <select onChange={this.changeStatus} name="orderStatus" form="editOrderForm">
            <option value="" >Choose a status...</option>
            <option key={1} value="open">Open</option>
            <option key={2} value="created">Created</option>
            <option key={3} value="processing">Processing</option>
            <option key={4} value="cancelled">Cancelled</option>
            <option key={5} value="completed">Completed</option>
            <option key={6} value="aborted">Aborted</option>
          </select>
        </form>

        <div className="row">
          <div className="col-md-9">
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th>EMAIL</th>
                  <th>STATUS</th>
                  <th>OPTIONS</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.orders
                    .filter(order => order.status.includes(this.state.orderFilter))
                    .map(order => {
                      return (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.email}</td>
                          <td>{order.status}</td>
                          <td>OPTIONS</td>
                        </tr>
                      );
                    })
                }
              </tbody>
            </table>
          </div>
          <div className="col-md-3">
            <h4>Edit Order Form</h4>
            <form id="editOrderForm" className="form-group" onSubmit={this.submitEditOrder}>
              <label>Select a order to edit:</label>
              <select name="orderSelect" form="editOrderForm">
                {/* Creates an option in the select for each individual order */}
                {this.props.orders.map(order => (<option key={order.id} value={order.id}>#{order.id}-{order.email}</option>))}
              </select>
              <select name="orderStatus" form="editOrderForm">
                <option key={1} value="open">Open</option>
                <option key={2} value="created">Created</option>
                <option key={3} value="processing">Processing</option>
                <option key={4} value="cancelled">Cancelled</option>
                <option key={5} value="completed">Completed</option>
                <option key={6} value="aborted">Aborted</option>
              </select>
              <input name="submitEditOrder" type="submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    orders: state.orders
  };
};

const mapDispatch = (dispatch) => {
  return {
    editOrderInfo: (id, order) => {
      dispatch(editOrder(id, order));
    }
  };
};

export default connect(mapState, mapDispatch)(AdminOrderForm);
