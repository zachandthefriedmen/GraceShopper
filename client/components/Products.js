import React from 'react';
import { connect } from 'react-redux';
import ProductCell from './ProductCell';
import { fetchProducts } from '../store';


const Products = props => {

  const allProducts = [{ id: 1, name: 'Leash', price: 4.95, description: 'This is the coolest leash you have EVER seen! It also will never break.', image: 'https://www.placecage.com/200/300' },
                       { id: 2, name: 'Bone', price: 0.95, description: 'This is a bone.', image: 'https://www.placecage.com/g/200/300' },
                       { id: 3, name: 'Leash', price: 4.95, description: 'This is the coolest leash you have EVER seen! It also will never break.', image: 'https://www.placecage.com/c/200/300' },
                       { id: 4, name: 'Bone', price: 0.95, description: 'This is a bone.', image: 'https://www.placecage.com/g/200/300' },
                       { id: 5, name: 'Leash', price: 4.95, description: 'This is the coolest leash you have EVER seen! It also will never break.', image: 'https://www.placecage.com/200/300' },
                       { id: 6, name: 'Bone', price: 0.95, description: 'This is a bone.', image: 'https://www.placecage.com/c/200/300' },
                       { id: 7, name: 'Leash', price: 4.95, description: 'This is the coolest leash you have EVER seen! It also will never break.', image: 'https://www.placecage.com/200/300' },
                       { id: 8, name: 'Bone', price: 0.95, description: 'This is a bone.', image: 'https://www.placecage.com/g/200/300' },
                       { id: 9, name: 'Bone', price: 0.95, description: 'This is a bone.', image: 'https://www.placecage.com/c/200/300' },];

  const changeCategory = event => {
    // Old code for filtering out products according to the selected category
    //   props.categoryProducts = props.allProducts.filter(product => {
    //     return product.categoryId === event.target.value;
    //   });
  };

  return (
    <div className="container">
      <div id="filter-bar" className="row card">
        <h4 className="col-md-2">Category</h4>
        <form onSubmit={changeCategory} className="col-md-6">
          <select>
            <option value="default">Choose a category</option>
            {
              // Old text mapping out the list of category options inside of select input field
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

      <div className="row">
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
