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
    };
  }

  componentDidMount() {
    this.props.fetchAccountData(this.props.user.id);
  }


  render() {
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
          {this.props.user.googleId
            ? <p>User has integrated google</p>
            : <button type="button" name="login-google">LOG IN</button>
          }
          <h5>FACEBOOK</h5>
          {this.props.user.facebookId
            ? <p>User has integrated facebook</p>
            : <button type="button" name="login-facebook">LOG IN</button>
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
