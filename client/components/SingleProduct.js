import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchReviewsForProduct, updateCart, makeNewCart, createReview } from '../store';

/**
 * COMPONENT
 */
class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.addToCartClick = this.addToCartClick.bind(this);
    this.item = {};
    this.rating = 0; //if we want to calculate rating locally when we hit this component
  }

  componentDidMount() {
    this.props.getReviews(this.props.match.params.id);
  }

  addToCartClick(event) {
    event.preventDefault();
    let quant = event.target.number.value;

    if (this.props.cart.order) {
      this.props.editCart(this.props.cart.order.id, this.item.id, this.item.price, +quant);
    } else {
      this.props.newCart(this.item.id, this.item.price, +quant);
    }
  }

  createNewReview = (event) => {
    event.preventDefault();

    let review = {
      title: event.target.title.value,
      body: event.target.body.value,
      stars: +event.target.stars.value,
      userId: this.props.user.id,
      productId: +this.props.match.params.id
    };
    
    this.props.createNewReview(review);
  }

  render() {
    if (!this.props.product.length) return (<div />);
    let thisItem = this.props.product.filter(item => item.id === +this.props.match.params.id);
    this.item = thisItem[0];

    //if we want to calculate rating locally when we hit this component
    this.rating = 0;
    let nbrOfReviews = 0;
    this.props.reviews.forEach(review => {
      if (review.productId === this.item.id) {
        this.rating += review.stars;
        nbrOfReviews++;
      }
    });
    this.rating = this.rating / nbrOfReviews;
    //if we want to calculate rating locally when we hit this component

    return (
      <div className="container">
        <div className="row">
          <div id="LeftText" className="jumbotron col-md-5">
            <h1 className="display-3">{this.item.name}</h1>
            <p className="lead">Rating: {this.rating} / 5</p>
            <p className="lead">Price: ${this.item.price}</p>
            <form onSubmit={this.addToCartClick}>
              <input id="number" type="number" min="1" max="50" defaultValue="1" />
              <button className="btn btn-primary" type="submit">Add To Cart</button>
            </form>
            <hr className="my-2" />
            <p>{this.item.description}</p>
            <p>Categories:</p>
            {this.item.categories.map(category => {
              return (<p key={category.id}>{category.name}</p>
              );
            })}
            <p>{this.item.category}</p>
          </div>
          <div className="col-md-7">
            <img className="img-fluid product-image" src={this.item.images[0]} />
          </div>
        </div>
        <div className="row">
          {this.props.reviews.map(review => {
            return (
              <div key={review.id} className="col-md-4">
                <h2>{review.title}</h2>
                <h5 className="text-warning">{review.stars} / 5</h5>
                <p> A review by <a href={'mailto:' + review.user.email}>{review.user.fullName}</a></p>
                <p>{review.body}</p>
              </div>
            );
          })}
          <div>
            <h3>Leave a Review:</h3>
            <form onSubmit={this.createNewReview}>
              <label>Stars</label>
              <input type="number" name="stars" placeholder={5} />
              <label>Title</label>
              <input type="text" name="title" placeholder="title" />
              <label>Body</label>
              <input type="text" name="body" placeholder="body" />
              <input type="submit" name="submit" />
            </form>
          </div>
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
    cart: state.cart,
    product: state.product,
    reviews: state.review,
    user: state.user
  };
};

const mapDispatch = (dispatch) => {
  return {
    editCart: (cartId, productId, productPrice, quantity) => {
      dispatch(updateCart(cartId, productId, productPrice, quantity));
    },
    newCart: (productId, productPrice, quantity) => {
      dispatch(makeNewCart(productId, productPrice, quantity));
    },
    getReviews: (id) => {
      dispatch(fetchReviewsForProduct(id));
    },
    createNewReview: (review, userId, productId) => {
      dispatch(createReview(review, userId, productId));
    }
  };
};


export default connect(mapState, mapDispatch)(SingleProduct);
