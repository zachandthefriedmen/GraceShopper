import React from 'react';
import {connect} from 'react-redux';
import ProductCell from './ProductCell';

const Products = props => {

  const changeCategory = event => {
    this.props.categoryProducts = props.allProducts.filter(product => {
      return product.category === event.target.value;
    });
  };

  return (
    <div>
      <div id="filter-bar">
        <h4>Category</h4>
        <form onSubmit={changeCategory}>
          <select>
            <option value="default">Choose a category</option>
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            <option value="3">Category 3</option>
          </select>
          <input type="submit" value="filter" />
        </form>
      </div>

      <div>
        {
          this.props.categoryProducts.map(product => {
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
    categoryProducts: state.categoryProducts,
  };
};

export default connect(mapState)(Products);
