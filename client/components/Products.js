import React from 'react';
import {connect} from 'react-redux';
import ProductCell from './ProductCell';
import {fetchProducts} from '../reducers/productReducer';

const Products = props => {

  const allProducts = [ {id: 1, name: 'Leash', price: 4.95, description: 'This is the coolest leash you have EVER seen! It also will never break.', image: ['https://img.chewy.com/is/catalog/67364_MAIN._AC_SL1500_V1477926503_.jpg','https://img.chewy.com/is/catalog/104017_MAIN._AC_SL1500_V1477485456_.jpg']}, {id: 2, name: 'Bone', price: 0.95, description: 'This is a bone.', image: ['https://img.chewy.com/is/catalog/67364_MAIN._AC_SL1500_V1477926503_.jpg','https://img.chewy.com/is/catalog/104017_MAIN._AC_SL1500_V1477485456_.jpg']} ];

  const changeCategory = event => {
    // props.categoryProducts = props.allProducts.filter(product => {
    //   return product.categoryId === event.target.value;
    // });
  };

  return (
    <div>
      <div id="filter-bar">
        <h4>Category</h4>
        <form onSubmit={changeCategory}>
        <select>
          <option value="default">Choose a category</option>
            {
              // props.allCategories.map(category => {
              //   return (
              //     <option key={category.id} value={category.id}>{category.name}</option>
              //   );
              // })
            }
          </select>
          <input type="submit" value="filter" />
        </form>
      </div>

      <div>
        {
          allProducts.map(product => {
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
  };
};

const mapDispatch = dispatch => ({
  fetchProducts: () => {
    dispatch(fetchProducts());
  }
});

export default connect(mapState, mapDispatch)(Products);
