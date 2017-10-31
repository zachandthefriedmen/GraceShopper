import React from 'react';
import {connect} from 'react-redux';
import ProductCell from './ProductCell';
import {fetchProducts} from '../reducers/productReducer';

const Products = props => {

  const changeCategory = event => {
    props.categoryProducts = props.allProducts.filter(product => {
      return product.categoryId === event.target.value;
    });
  };

  return (
    <div>
      <div id="filter-bar">
        <h4>Category</h4>
        <form onSubmit={changeCategory}>
        <select>
          <option value="default">Choose a category</option>
            {
              props.allCategories.map(category => {
                return (
                  <option key={category.id} value={category.id}>{category.name}</option>
                );
              })
            }
          </select>
          <input type="submit" value="filter" />
        </form>
      </div>

      <div>
        {
          props.categoryProducts.map(product => {
            return (
              <ProductCell key={product.id} product={product} />
            );
          })
        }
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    allProducts: state.allProducts,
    // categoryProducts: state.categoryProducts,
  };
};

const mapDispatch = dispatch => ({
  fetchProducts: () => {
    dispatch(fetchProducts());
  }
});

export default connect(mapState, mapDispatch)(Products);
