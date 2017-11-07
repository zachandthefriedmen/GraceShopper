import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CartCell from './CartCell';
import { editOrder, clearCart } from '../store';

/**
 * COMPONENT
 */
const Order = (props) => {
  console.log('order page props', props);

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
    const newOrder = props.cart.order;
    newOrder.status = 'created';
    newOrder.orderDate = Date.now();
    props.submitOrder(newOrder.id, newOrder);
    // send email with totalQuantity, totalPrice, order date and order number
  };

  return (
    <div className="container" >
      {props.type === 'confirm' &&
        <h2 className="row">
          Order #{`${props.cart.order.id}`} Confirmation
        </h2>
      }
      {props.type === 'order' &&
        <h2 className="row">Order #{`${props.cart.order.id}`}</h2>
      }
      {props.type === 'order' &&
        <h2 className="row">Please Confirm Order Details</h2>
      }
      <div className="row">
        <h3 className="col-md-3">Quantity: {totalQuantity}</h3>
        <h3 className="col-md-3">Total Price: {totalPrice.toFixed(2)}</h3>
      </div>
      <div className="row">
        <div className="col-md-4">Address:</div>
        <div className="col-md=8">{`${props.cart.order.address}`}</div>
      </div>
      <div className="col-md-9 card-deck">
        {/* Iterating through an array of products, using a CartCell component for each one. */}
        {props.cart.order
          ? props.cart.orderProducts.map(product =>
            <CartCell key={product.id} product={product} />)
          : <h1>Add some things to your cart!</h1>
        }
      </div>
      <button
        title="buy"
        type="submit"
        className="btn btn-primary"
        onClick={handleSubmit}>Confirm Order</button>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapOrder = ({ cart }) => ({ cart, type: 'order' });
const mapCheckout = ({ cart }) => ({ cart, type: 'checkout' });
const mapConfirm = ({ cart }) => ({ cart, type: 'confirm' });

const mapDispatch = dispatch => {
  return {
    submitOrder(id, order) {
      dispatch(editOrder(id, order));
      dispatch(clearCart());
    }
  };
};

export const OrderDetails = connect(mapOrder)(Order);
export const Checkout = connect(mapCheckout, mapDispatch)(Order);
export const Confirm = connect(mapConfirm)(Order);

/**
 * PROP TYPES
 */
