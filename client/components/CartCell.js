import React from 'react';
import { Link } from 'react-router-dom';

const CartCell = ({ product }) => {

  return (
    <div className="col-md-4">
      <div className="card">
        <img className="card-img-top img-fluid" src={product.image} />
        <div className="card-block">
          <h4 className="card-title"><Link to={`/products/${product.id}`}>
            {product.name}
          </Link></h4>
          <p className="card-text">
            Quantity:## <br />
            Unit Cost:{product.price} <br />
            Quantity Cost:##
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartCell;
