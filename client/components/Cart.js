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
  const allProducts = [{ id: 1, name: 'Leash', price: 4.95, description: 'This is the coolest leash you have EVER seen! It also will never break.', image: 'https://www.placecage.com/200/300' }, { id: 2, name: 'Bone', price: 0.95, description: 'This is a bone.', image: 'https://www.placecage.com/g/200/300' }];

  return (
    <div>
      <div id="cart-header">
        <h2>Cart</h2>
        <h3>Quantity: ##</h3>
        <h3>Total Price: ##</h3>
      </div>
      <div id="cart-body">
        <div id="cart-body-left">
          <form>
            <input placeholder="name" title="name" type="text" />
            <input placeholder="email" title="email" type="text" />
            <input placeholder="address" title="address" type="text" />
            <input placeholder="city" title="city" type="text" />
            <input placeholder="state" title="state" type="text" />
            <input placeholder="zip" title="zip" type="text" />
            <button title="buy" type="submit" >buy</button>
          </form>
        </div>
        <div id="cart-body-right">
          {/* Itterating through an array of products, using a CartCell component for each one. */}
            {allProducts.map(product =>
              <CartCell key={product.id} product={product} />
            )}
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Leftover code from user-home.js (component this was based off of) in case someone else needs it later
    // email: state.user.email
  }
}

export default connect(mapState)(Cart);

/**
 * PROP TYPES
 */
// Leftover code from user-home.js (component this was based off of) in case someone else needs it later
// UserHome.propTypes = {
//   email: PropTypes.string
// }