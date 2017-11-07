import React from 'react';
import { Link } from 'react-router-dom';

const ProductCell = ({ product }) => {

  return (
    <div className="col-md-3">
      <Link to={`/products/${product.id}`}>
        <img className="img-thumbnail" src={product.images[0]} />
        <h2>{product.name}</h2>
        <h3>{product.price}</h3>
      </Link>
    </div>
  );
};

export default ProductCell;
