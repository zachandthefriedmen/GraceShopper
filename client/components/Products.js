import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductCell from './ProductCell';
import { fetchProducts, fetchCategories } from '../store';

// const allProducts = [{ id: 1, name: 'Leash', price: 4.95, description: 'This is the coolest leash you have EVER seen! It also will never break.', image: 'https://www.placecage.com/200/300' },
//                      { id: 2, name: 'Bone', price: 0.95, description: 'This is a bone.', image: 'https://www.placecage.com/g/200/300' },
//                      { id: 3, name: 'Leash', price: 4.95, description: 'This is the coolest leash you have EVER seen! It also will never break.', image: 'https://www.placecage.com/c/200/300' },
//                      { id: 4, name: 'Bone', price: 0.95, description: 'This is a bone.', image: 'https://www.placecage.com/g/200/300' },
//                      { id: 5, name: 'Leash', price: 4.95, description: 'This is the coolest leash you have EVER seen! It also will never break.', image: 'https://www.placecage.com/200/300' },
//                      { id: 6, name: 'Bone', price: 0.95, description: 'This is a bone.', image: 'https://www.placecage.com/c/200/300' },
//                      { id: 7, name: 'Leash', price: 4.95, description: 'This is the coolest leash you have EVER seen! It also will never break.', image: 'https://www.placecage.com/200/300' },
//                      { id: 8, name: 'Bone', price: 0.95, description: 'This is a bone.', image: 'https://www.placecage.com/g/200/300' },
//                      { id: 9, name: 'Bone', price: 0.95, description: 'This is a bone.', image: 'https://www.placecage.com/c/200/300' },]

// const categories = [{id: 1, name: 'leash'}, {id: 2, name: 'treats'}];



class Products extends Component {

  constructor(props) {
    super(props);
    this.changeCategory = this.changeCategory.bind(this)
  }

  componentWillMount() {
    this.props.fetchProductData();
  }

  changeCategory = event => {
    // Old code for filtering out products according to the selected category
    //   props.categoryProducts = props.allProducts.filter(product => {
    //     return product.categoryId === event.target.value;
    //   });
  };

  render() {
    return (
      <div className="container">
        <div id="filter-bar" className="row card">
          <h4 className="col-md-2">Category</h4>
          <form onSubmit={this.changeCategory} className="col-md-6">
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
            this.props.product.map(product => {
              return (
                <ProductCell key={product.id} product={product} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = ({ product }) => ({ product });

const mapDispatch = dispatch => ({
  fetchProductData: () => {
    dispatch(fetchProducts());
  }
});

export default connect(mapState, mapDispatch)(Products);
