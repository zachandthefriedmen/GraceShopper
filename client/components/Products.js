import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductCell from './ProductCell';
import { fetchProducts, fetchCategories } from '../store';

class Products extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nameFilter: '',
      categoryFilter: 0,
    };
    this.changeCategory = this.changeCategory.bind(this);
  }

  componentWillMount() {
    this.props.fetchProductData();
  }

  changeCategory = event => {
    this.setState({ categoryFilter: +event.target.value });
  };

  changeNameFilter = event => {
    this.setState({ nameFilter: event.target.value });
  }

  render() {
    return (
      <div className="container">
        <div id="filter-bar" className="row card">
          <h4 className="col-md-2">Category</h4>
          <form className="col-md-6">
            <input type="text" name="nameFilter" placeholder="search..." onChange={this.changeNameFilter} />
            <select onChange={this.changeCategory}>
              <option value={0} >Choose a category</option>
              {
                this.props.category.map(category => {
                  return (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  );
                })
              }
            </select>
          </form>
        </div>

        <div className="row">
          {
            this.state.categoryFilter ?
              this.props.category
                .filter(item => item.id === this.state.categoryFilter)[0].products
                .filter(item => item.name.toLowerCase().includes(this.state.nameFilter.toLowerCase()))
                .map(product => (<ProductCell key={product.id} product={product} />))
              : this.props.product
                .filter(item => item.name.toLowerCase().includes(this.state.nameFilter.toLowerCase()))
                .map(product => (
                  <ProductCell key={product.id} product={product} />
                )
                )
          }
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = ({ product, category }) => ({ product, category });

const mapDispatch = dispatch => ({
  fetchProductData: () => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }
});

export default connect(mapState, mapDispatch)(Products);
