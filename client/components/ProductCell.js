import React from 'react';
import { Link } from 'react-router-dom';

const ProductCell = ({ product }) => {

  return (
    <div className="col-md-4">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} />
        <h2>{product.name}</h2>
        <h3>{product.price}</h3>
      </Link>
    </div>
  );
};

export default ProductCell;
