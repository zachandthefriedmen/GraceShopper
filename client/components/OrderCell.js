import React from 'react';
import { Link } from 'react-router-dom';

const OrderCell = ({ order }) => {
  console.log('order', order);
  return (
    <div className="col-md-3">
      <h2>Order Number: {order.id}</h2>
      <h3>Order Total: {//order.totalPrice
      }</h3>
      <h3>Order Date: {order.orderDate}</h3>
    </div>
  );
};

export default OrderCell;
