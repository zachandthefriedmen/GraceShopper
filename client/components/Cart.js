import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CartCell from './CartCell';

/**
 * COMPONENT
 */
export const Cart = (props) => {
  // Leftover code from user-home.js (component this was based off of) in case someone else needs it later
  // const {email} = props

  //Dummy data from Products
  // const allProducts = [{ id: 1, name: 'Leash', price: 4.95, description: 'This is the coolest leash you have EVER seen! It also will never break.', image: 'https://www.placecage.com/200/300' },
  // { id: 2, name: 'Bone', price: 0.95, description: 'This is a bone.', image: 'https://www.placecage.com/g/200/300' },
  // { id: 3, name: 'Leash', price: 4.95, description: 'This is the coolest leash you have EVER seen! It also will never break.', image: 'https://www.placecage.com/200/300' },
  // { id: 4, name: 'Bone', price: 0.95, description: 'This is a bone.', image: 'https://www.placecage.com/g/200/300' }];
  let totalQuantity = 0;
  let totalPrice = 0;

  if (props.cart.order) {
    props.cart.orderProducts.forEach(op => {
      totalQuantity += op['order-product'].quantity;
      totalPrice += (op['order-product'].quantity * op['order-product'].price);
    });
  }

  return (
    <div className="container" >
      <div id="cart-header" className="row">
        <h2 className="col-md-3 offset-md-3">Cart</h2>
        <h3 className="col-md-3">Quantity: {totalQuantity}</h3>
        <h3 className="col-md-3">Total Price: {totalPrice.toFixed(2)}</h3>
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
const mapState = ({ cart }) => ({ cart });

export default connect(mapState)(Cart);

/**
 * PROP TYPES
 */
// Leftover code from user-home.js (component this was based off of) in case someone else needs it later
// UserHome.propTypes = {
//   email: PropTypes.string
// }
