import React from 'react';
import { Link } from 'react-router-dom';

const OrderCell = ({ order }) => {
  let totalQuantity = 0;
  let totalPrice = 0;
  order.orderProducts.forEach(op => {
    totalQuantity += op.quantity;
    totalPrice += (op.quantity * op.price);
  });

  return (

    <div className="col-md-3">
      <h3>Order Number: <Link to={`/order/${order.id}`}>{order.id}</Link></h3>
      <h4>Order Total: ${totalPrice.toFixed(2)}</h4>
      <h4>Order Quantity: {totalQuantity}</h4>
      <h4>Order Date: {order.orderDate}</h4>
    </div>
  );
};

export default OrderCell;
