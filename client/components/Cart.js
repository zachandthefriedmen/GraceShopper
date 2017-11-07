import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CartCell from './CartCell';
import { checkoutCart } from '../store';

/**
 * COMPONENT
 */
export const Cart = (props) => {
  let totalQuantity = 0;
  let totalPrice = 0;

  if (props.cart.order) {
    props.cart.orderProducts.forEach(op => {
      totalQuantity += op['order-product'].quantity;
      totalPrice += (op['order-product'].quantity * op['order-product'].price);
    });
  }

  const handleSubmit = event => {
    event.preventDefault();

    const id = props.user
      ? props.user.id
      : null;
    const name = props.user
      ? props.user.fullName
      : event.target.name.value;
    const email = props.user
      ? props.user.email
      : event.target.email.value;
    const address = name + ', '
      + event.target.address.value + ', '
      + event.target.city.value + ', '
      + event.target.state.value + ', '
      + event.target.zip.value;

    const newOrder = props.cart.order;
    newOrder.address = address;
    newOrder.email = email;
    newOrder.userId = id;
    props.goToCheckout(newOrder);
  };

  return (
    <div className="container" >
      <div id="cart-header" className="row">
        <h2 className="col-md-3 offset-md-3">Cart</h2>
        <h3 className="col-md-3">Quantity: {totalQuantity}</h3>
        <h3 className="col-md-3">Total Price: {totalPrice.toFixed(2)}</h3>
      </div>
      <div id="cart-body" className="row">
        <div id="cart-body-left" className="col-md-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {!props.user &&
                <div>
                  <label>Name:</label>
                  <input placeholder="name" name="name" type="text" className="form-control" />
                  <label>Email:</label>
                  <input placeholder="email" name="email" type="email" className="form-control" />
                </div>
              }
              <label>Address:</label>
              <input placeholder="address" name="address" type="text" className="form-control" />
              <label>City:</label>
              <input placeholder="city" name="city" type="text" className="form-control" />
              <label>State:</label>
              <input placeholder="state" name="state" type="text" className="form-control" />
              <label>Zip:</label>
              <input placeholder="zip" name="zip" type="text" className="form-control" />
              <button title="Checkout" type="submit" className="btn btn-primary">Checkout</button>
            </div>
          </form>
        </div>
        <div id="cart-body-right" className="col-md-9 card-deck">
          {/* Iterating through an array of products, using a CartCell component for each one. */}
          {props.cart.order
            ? props.cart.orderProducts.map(product =>
              <CartCell key={product.id} product={product} />)
            : <h1>Add some things to your cart!</h1>
          }
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = ({ cart, user }) => ({ cart, user });

const mapDispatch = dispatch => {
  return {
    goToCheckout(order) {
      dispatch(checkoutCart(order));
    }
  };
};

export default connect(mapState, mapDispatch)(Cart);

/**
 * PROP TYPES
 */
