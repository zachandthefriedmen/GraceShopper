import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminOrderForm = (props) => {
  const { orders } = props;

  return (
    <div>
      <table>
        <tr>
          <th>ID</th>
          <th>EMAIL</th>
          <th>STATUS</th>
          <th>OPTIONS</th>
        </tr>
        {
          orders.map(order => {
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
      </table>
    </div>
  );
};

const mapState = state => {
  return {
    orders: state.orders
  };
};

export default connect(mapState)(AdminOrderForm);
