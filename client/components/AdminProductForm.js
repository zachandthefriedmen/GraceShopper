import React from 'react';
import { connect } from 'react-redux';
import { editProduct } from '../store';
import { Link } from 'react-router-dom';



const AdminProductForm = (props) => {
  const { products } = props;
  console.log(props);


  // Edits product corresponding to editProductForm.select, changing fields with new values.
  let submitEditProduct = (event) => {
    event.preventDefault();
    let productChanges = {
      id: event.target.productSelect.value,
      name: event.target.productName.value,
      price: +event.target.productPrice.value
    };
    console.log("PC", productChanges);
    console.log("ID", event.target.productSelect.value);
    props.editProductInfo(event.target.productSelect.value, productChanges);
  };

  if (!products) return (<div />);

  return (
    <div>
      <table id="productsTable">
        <tbody>
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
        </tbody>
      </table>

      <h4>Edit Products Form</h4>
      <form id="editProductForm" onSubmit={submitEditProduct}>
        <label>Select a product to edit:</label>
        <select name="productSelect" form="editProductForm">
          {/* Creates an option in the select for each individual product */}
          {products.map(product => (<option key={product.key} value={product.id}>{product.name}</option>))}
        </select>
        <input name="productName" type="text" placeholder="New Name" />
        <input name="productPrice" type="number" step=".01" placeholder="New Price" />
        <input name="submitNewProduct" type="submit" />
      </form>
    </div>
  );
};

const mapState = state => {
  return {
    products: state.product
  };
};

const mapDispatch = (dispatch) => {
  return {
    editProductInfo: (id, product) => {
      dispatch(editProduct(id, product));
    }
  };
};

export default connect(mapState, mapDispatch)(AdminProductForm);
