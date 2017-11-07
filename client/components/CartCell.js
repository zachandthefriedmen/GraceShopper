import React from 'react';
import { Link } from 'react-router-dom';

const CartCell = ({ product }) => {

  return (
    <div className="col-md-4">
      <div className="card">
        <img className="card-img-top img-thumbnail" src={product.images[0]} />
        <div className="card-block">
          <h4 className="card-title"><Link to={`/products/${product.id}`}>
            {product.name}
          </Link></h4>
          <p className="card-text">
            Quantity: {product['order-product'].quantity} <br />
            Unit Cost: {product['order-product'].price} <br />
            Total Cost: {(product['order-product'].price * product['order-product'].quantity).toFixed(2)} <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartCell;
