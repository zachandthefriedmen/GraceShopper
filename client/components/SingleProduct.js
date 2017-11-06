import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editOrder, createOrder, fetchProduct, fetchReviewsForProduct, createReview } from '../store';
/**
 * COMPONENT
 */
class SingleProduct extends Component {
  // Leftover code from user-home.js (component this was based off of) in case someone else needs it later
  // const {email} = props
  constructor(props){
    super(props);
    this.submitReview = this.submitReview.bind(this);
  }
  componentDidMount() {
    this.props.getThisProduct(this.props.match.params.id);
  }

  submitReview(event) {
    event.preventDefault();
    console.log(typeof event.target.stars.value);
    let reviewObject = {
      stars: +event.target.stars.value,
      title: event.target.title.value,
      body: event.target.body.value,
      userId: +this.props.user.id,
      productId: +this.props.match.params.id,
    };
    this.props.createNewReview(reviewObject);
    event.target.stars.value = 5;
    event.target.title.value = '';
    event.target.body.value = '';
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
            <input id="number" type="number" min="1" max="50" defaultValue="1" />
            <button className="btn btn-primary" onClick={() => this.props.addToCartClick(this.props.cart, this.props.product)}>Add To Cart</button>
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
        <form onSubmit={this.submitReview}>
          <h3>Leave a Review</h3>
          <label>Stars</label>
          <input id="stars" type="number" min="1" max="5" defaultValue="5" />
          <label>Title</label>
          <input id="title" type="text" />
          <label>Body</label>
          <input id="body" type="text" />
          <input id="submit" type="submit" />
        </form>
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
    cart: state.order,
    product: state.product,
    reviews: state.review,
    user: state.user
  };
};
const mapDispatch = (dispatch) => {
  return {
    addToCartClick: (cart, product) => {
      let quant = document.getElementById('number').value;
      const thisOrder = {quantity: +quant, price: product.price, productId: product.id};
      console.log(thisOrder);
      if (cart.length) {
        // dispatch(editOrder(state.order.id, thisOrder));
        //api/cart/orderId
      } else {
        dispatch(createOrder());
      }
    },
    getThisProduct: (id) => {
      dispatch(fetchProduct(id));
      dispatch(fetchReviewsForProduct(id));
    },
    createNewReview: (review) => {
      dispatch(createReview(review));
    },
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