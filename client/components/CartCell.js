import React from 'react';
import { Link } from 'react-router-dom';

const CartCell = ({ product }) => {

  return (
    <div id="cart-item">
      {/* Link around each items name, leading to corresponding SingleProduct page */}
      <Link to={`/products/${product.id}`}>
        <h4>{product.name}</h4>
      </Link>
        <h5>Quantity:##</h5>
        <h5>Unit Cost:{product.price}</h5>
        <h5>Quantity Cost:##</h5>
        <img src="http://www.placecage.com/100/100" />
      <button id="delete">delete</button>
    </div>
  );
};

export default CartCell;
