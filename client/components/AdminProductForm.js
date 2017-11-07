import React from 'react';
import { connect } from 'react-redux';
import { editProduct, createProduct } from '../store';
import { Link } from 'react-router-dom';



const AdminProductForm = (props) => {
  const { products } = props;
  console.log(props);

  // Creates a new product when form is submitted
  let submitCreateProduct = (event) => {
    event.preventDefault();
    let newProduct = {
      name: event.target.productName.value,
      price: +event.target.productPrice.value,
      image: event.target.productImage.value,
      description: event.target.productBody.value,
      available: true,
      rating: 5.0,
    };
    props.createNewProduct(newProduct);
  };

  // Edits product corresponding to editProductForm.select when form is submitted, changing fields with new values.
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

  let disableProductClick = (id) => {
    // Logic for disabling a product, wanted to wait and see if everyone wanted a button for this or would rather do it in the edit form before implimenting
    // props.editProductInfo(id, );
  };


  //TODO: Add categories for products
  console.log(products);
  if (!products) return (<div />);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <table className="table table-striped" id="productsTable">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>AVAILABLE</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>RATING</th>
                <th>OPTIONS</th>
              </tr>
            </thead>
            <tbody>
              {
                products.map(product => {
                  return (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.available}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.rating}</td>
                      <td><button onClick={() => disableProductClick(product.id)}><i className="fa fa-times" /></button></td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
        <div className="col-md-3">

        <h4>Create Products Form</h4>
          <form id="createProductForm" className="form-group" onSubmit={submitCreateProduct}>
            <label>Select a product to edit:</label>
            <input name="productName" className="form-control" type="text" placeholder="Name" />
            <input name="productBody" className="form-control" type="text" placeholder="Body" />
            <input name="productImage" className="form-control" type="text" placeholder="Image URL" />
            <input name="productPrice" className="form-control" type="number" step=".01" placeholder="Price" />
            <input name="submitNewProduct" type="submit" />
          </form>

          <h4>Edit Products Form</h4>
          <form id="editProductForm" className="form-group" onSubmit={submitEditProduct}>
            <label>Select a product to edit:</label>
            <select name="productSelect" form="editProductForm">
              {/* Creates an option in the select for each individual product */}
              {products.map(product => (<option key={product.key} value={product.id}>{product.name}</option>))}
            </select>
            <input name="productName" className="form-control" type="text" placeholder="New Name" />
            <input name="productPrice" className="form-control" type="number" step=".01" placeholder="New Price" />
            <input name="submitEditProduct" type="submit" />
          </form>
        </div>
      </div>
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
    createNewProduct: (product) => {
      dispatch(createProduct(product));
    },
    editProductInfo: (id, product) => {
      dispatch(editProduct(id, product));
    }
  };
};

export default connect(mapState, mapDispatch)(AdminProductForm);
