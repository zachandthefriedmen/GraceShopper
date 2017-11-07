import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CartCell from './CartCell';
import { fetchCart, fetchOrdersForUser } from '../store';

/**
 * COMPONENT
 */
class Cart extends Component {
  // Leftover code from user-home.js (component this was based off of) in case someone else needs it later
  // const {email} = props
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCart();
    console.log(this.state);
  }

  render() {
    return (
      <div className="container" >
        <div id="cart-header" className="row">
          <h2 className="col-md-3 offset-md-3">Cart</h2>
          <h3 className="col-md-3">Quantity: ##</h3>
          <h3 className="col-md-3">Total Price: ##</h3>
        </div>
        <div id="cart-body" className="row">
          <div id="cart-body-left" className="col-md-3">
            <form>
              <div className="form-group">
                <label>Name:</label>
                <input placeholder="name" title="name" type="text" className="form-control" />
                <label>Email:</label>
                <input placeholder="email" title="email" type="email" className="form-control" />
                <label>Address:</label>
                <input placeholder="address" title="address" type="text" className="form-control" />
                <label>City:</label>
                <input placeholder="city" title="city" type="text" className="form-control" />
                <label>State:</label>
                <input placeholder="state" title="state" type="text" className="form-control" />
                <label>Zip:</label>
                <input placeholder="zip" title="zip" type="text" className="form-control" />
                <button title="buy" type="submit" className="btn btn-primary">Place Order</button>
              </div>
            </form>
          </div>
          <div id="cart-body-right" className="col-md-9 card-deck">
            {/* Itterating through an array of products, using a CartCell component for each one. */}
            {
              allProducts.map(product =>
                <CartCell key={product.id} product={product} />
                )
            }
          </div>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapCart = (state) => {
  return {
    // Leftover code from user-home.js (component this was based off of) in case someone else needs it later
    // email: state.user.email
    user: state.user,
    cartItems: state.cart
  };
};

// const mapOrder = (state) => {
//   return {
//     // Leftover code from user-home.js (component this was based off of) in case someone else needs it later
//     // email: state.user.email
//   };
// };

const mapDispatch = (dispatch) => {
  return {
    getCart: () => {
      dispatch(fetchCart());
    },
    getOrder: (id) => {
      dispatch(fetchOrdersForUser(id));
    }
  };
};

export const CartForm = connect(mapCart, mapDispatch)(Cart);
// export const OrderForm = connect(mapOrder, mapDispatch)(Cart);
