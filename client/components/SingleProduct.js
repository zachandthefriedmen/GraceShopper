import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editOrder, createOrder, fetchProduct, fetchReviewsForProduct, updateCart, makeNewCart } from '../store';

/**
 * COMPONENT
 */
class SingleProduct extends Component {
  // Leftover code from user-home.js (component this was based off of) in case someone else needs it later
  // const {email} = props
  constructor(props){
    super(props);
    this.addToCartClick = this.addToCartClick.bind(this);
  }

  componentDidMount() {
    this.props.getThisProduct(this.props.match.params.id);
  }

  addToCartClick (event) {
    event.preventDefault();
    let quant = event.target.number.value;

    if (this.props.cart.order) {
      this.props.editCart(this.props.cart.order.id, this.props.product.id, this.props.product.price, +quant);
    } else {
      this.props.newCart(this.props.product.id, this.props.product.price, +quant);
    }
  }

  render() {
    if (!Object.keys(this.props.product).length) return (<div />);

    return (
      <div className="container">
        <div className="row">
          <div id="LeftText" className="jumbotron col-md-5">
            <h1 className="display-3">{this.props.product.name}</h1>
            <p className="lead">{this.props.product.rating}</p>
            <p className="lead">{this.props.product.price}</p>
            <form onSubmit={this.addToCartClick}>
              <input id="number" type="number" min="1" max="50" defaultValue="1" />
              <button className="btn btn-primary" type="submit">Add To Cart</button>
            </form>
            <hr className="my-2" />
            <p>Category</p>
            <p>{this.props.product.description}</p>
          </div>
          <div className="col-md-7">
            <img src="http://www.placecage.com/400/600" />
          </div>
        </div>
        <div className="row">
          {this.props.reviews.map(review => {
            return (
              <div key={review.id} className="col-md-4">
                <h2>{review.title}</h2>
                <h5 className="text-warning">{review.stars}</h5>
                <p>{review.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Leftover code from boilerplate user-home.js
    // email: state.user.email
    cart: state.cart,
    product: state.product,
    reviews: state.review
  };
};

// const mapDispatch = (dispatch) => {
//   return {
//     addToCartClick: (event, cart, product) => {
//       event.preventDefault();
//       let quant = event.target.value;
//       console.log(event.target);
//       if (cart.id) {
//         dispatch(updateCart(cart.id, product.id, product.price, +quant));
//       } else {
//         dispatch(makeNewCart(product.id, product.price, +quant));
//       }
//     },
//     getThisProduct: (id) => {
//       dispatch(fetchProduct(id));
//       dispatch(fetchReviewsForProduct(id));
//     }
//   };
// };

const mapDispatch = (dispatch) => {
  return {
    editCart: (cartId, productId, productPrice, quantity) => {
      dispatch(updateCart(cartId, productId, productPrice, quantity));
    },
    newCart: (productId, productPrice, quantity) => {
      dispatch(makeNewCart(productId, productPrice, quantity));
    },
    getThisProduct: (id) => {
      dispatch(fetchProduct(id));
      dispatch(fetchReviewsForProduct(id));
    }
  };
};


export default connect(mapState, mapDispatch)(SingleProduct);

/**
 * PROP TYPES
 */
// Leftover code from user-home.js
// UserHome.propTypes = {
//   email: PropTypes.string
// }
