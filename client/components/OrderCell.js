import React from 'react';
import { Link } from 'react-router-dom';

const OrderCell = ({ order }) => {

  return (
    <div className="col-md-3">
      <h2>{order.id}</h2>
      <h3>{order.price}</h3>
      <table>
        <tr>
          <th>NAME</th>
          <th>PRICE</th>
          <th>#</th>
          <th>TOTAL</th>
        </tr>
        {
          order.items.map(item => {
            return (
              <tr key={item.productId}>
                <td>{item.productId}</td>
                <td>{item.price}</td>
                <td>{item.qty}</td>
                <td>{item.price * item.qty}</td>
              </tr>
            );
          })
        }
      </table>
    </div>
  );
};

export default OrderCell;
