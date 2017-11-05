import React from 'react';
import { Link } from 'react-router-dom';

const CartCell = ({ product }) => {

  return (

    // <div id="cart-item" className="card col-md-3">
    //   {/* Link around each items name, leading to corresponding SingleProduct page */}
    //   <img src="http://www.placecage.com/800/400" className="card-img-top img-fluid" />
    //   <div id="cart-content" className="card-body">
    //     <h4 className="card-title"> </h4>
    //     <p className="card-text">
    //       Quantity:##
    //     Unit Cost:{product.price}
    //       Quantity Cost:##
    //     </p>
    //     <button id="delete">delete</button>
    //   </div>
    // </div>

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
