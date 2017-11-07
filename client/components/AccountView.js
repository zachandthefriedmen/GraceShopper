import React, { Component, Link } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrderCell from './OrderCell';
import { fetchOrdersForUser } from '../store';

/**
 * COMPONENT
 */
class AccountView extends Component {
  // Leftover code from user-home.js (component this was based off of) in case someone else needs it later
  // const {email} = props
  constructor() {
    super();
    this.state = {

      dummyOrders: [{
        id: 1,
        items: [{ productId: 1, qty: 2, price: 4.65 },
        { productId: 2, qty: 154, price: 0.99 }],
        status: 'open',
        email: 'bento@dogs.woof',
        orderDate: new Date(),
        sessionId: 'new session',
        address: 'Bento Thor, 123 Dog Street, Chicago, IL 60608'
      }, {
        id: 2,
        items: [{ productId: 4, qty: 4, price: 4.00 },
        { productId: 24, qty: 1, price: 1900.99 }],
        status: 'completed',
        email: 'chili@dogs.woof',
        orderDate: new Date(),
        sessionId: 'new session',
        address: 'Chili Thor, 123 Bark Boulevard, Chicago, IL 60607'
      }],
    };
  }

  componentDidMount() {
    this.props.fetchAccountData(this.props.user.id);
  }


  render() {
    console.log('USER DATA: ', this.props.user);
    console.log('ORDERS: ', this.props.orders);
    return (
      <div className="container">
        <h2>{this.props.user.fullName}</h2>
        <h3>{this.props.user.email}</h3>
        <form>
          <label>Change Email:</label>
          <input type="text" name="email" placeholder="New email" />
          <label>Change Password:</label>
          <input type="password" name="old-password" placeholder="Old password" />
          <input type="password" name="new-password" placeholder="New password" />
          <input type="password" name="new-password-verify" placeholder="Confirm new password" />

          <input type="submit" value="UPDATE" className="btn btn-primary" />
        </form>

        <div>
          <h5>GOOGLE</h5>
          {this.props.user.googleId === null
            ? <p>User has integrated google</p>
            : <button type="button" name="login-google">LOG IN</button>
          }
          <h5>FACEBOOK</h5>
          {this.props.user.googleId === null
            ? <button type="button" name="login-facebook">LOG IN</button>
            : <p>User has integrated facebook</p>
          }
        </div>

        <div>
          <h4>ORDER HISTORY</h4>
          {
            this.props.orders.map(order => {
              if (order.status !== ('open' || 'aborted')) {
                return (
                  <OrderCell key={order.id} order={order} />
                );
              }
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
// const mapState = ({user}) => { return user;
//   // return {
//   //   // Leftover code from boilerplate user-home.js
//   //   // email: state.user.email
//   // };
// };


const mapState = ({ user, orders }) => ({ user, orders });

const mapDispatch = dispatch => ({
  fetchAccountData: (id) => {
    dispatch(fetchOrdersForUser(id));
  }
});

export default connect(mapState, mapDispatch)(AccountView);

/**
 * PROP TYPES
 */
// Leftover code from user-home.js
// UserHome.propTypes = {
//   email: PropTypes.string
// }
