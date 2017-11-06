import React from 'react';
import { connect } from 'react-redux';
import { editProduct } from '../store';
import { Link } from 'react-router-dom';

const AdminProductForm = (props) => {
  const { products } = props;

  return (
    <div>
      <table>
        <tr>
          <th>ID</th>
          <th>AVAILABLE</th>
          <th>NAME</th>
          <th>PRICE</th>
          <th>RATING</th>
          <th>OPTIONS</th>
        </tr>
        {
          products.map(product => {
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.available}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.rating}</td>
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
    products: state.products
  };
};

const mapDispatch = (dispatch) => {
    return {
      getAllInfo: (id, product) => {
        dispatch(editProduct(id, product));
      }
    };
  };

export default connect(mapState, mapDispatch)(AdminProductForm);
