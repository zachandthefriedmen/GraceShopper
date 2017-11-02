import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrderCell from './OrderCell';

/**
 * COMPONENT
 */
export const AccountView = (props) => {
  // Leftover code from user-home.js (component this was based off of) in case someone else needs it later
  // const {email} = props

  const dummyOrders = [{ id: 1,
    items: [{ productId: 1, qty: 2, price: 4.65 },
    { productId: 2, qty: 154, price: 0.99 }],
    status: 'open',
    email: 'bento@dogs.woof',
    orderDate: new Date(),
    sessionId: 'new session',
    address: 'Bento Thor, 123 Dog Street, Chicago, IL 60608'
  }, { id: 2,
    items: [{ productId: 4, qty: 4, price: 4.00 },
    { productId: 24, qty: 1, price: 1900.99 }],
    status: 'completed',
    email: 'chili@dogs.woof',
    orderDate: new Date(),
    sessionId: 'new session',
    address: 'Chili Thor, 123 Bark Boulevard, Chicago, IL 60607'
  }];

  const dummyReviews = [{ id: 1, stars: 5, title: 'This bone broke', body: 'This is the coolest leash you have EVER seen! It also will never break.' },
  { id: 2, stars: 5, title: 'This bone broke', body: 'This is the coolest leash you have EVER seen! It also will never break.' },
  { id: 3, stars: 5, title: 'This bone broke', body: 'This is the coolest leash you have EVER seen! It also will never break.' },
  { id: 4, stars: 5, title: 'This bone broke', body: 'This is the coolest leash you have EVER seen! It also will never break.' },
  { id: 5, stars: 5, title: 'This bone broke', body: 'This is the coolest leash you have EVER seen! It also will never break.' },
];

  return (
    <div>
      <h3>USER NAME</h3>
      <h4>USER EMAIL</h4>
      <form>
        <label>
          EMAIL
            <input type="text" name="email" placeholder="New email" />
        </label>
        <label>
          PASSWORD
            <input type="text" name="old-password" placeholder="Old password" />
            <input type="text" name="new-password" placeholder="New password" />
            <input type="text" name="new-password-verify" placeholder="Confirm new password" />
        </label>
          <input type="submit" value="UPDATE" />
      </form>

      <div>
        <h5>GOOGLE</h5>
        <button type="button" name="login-google">LOG IN</button>
        <p>User has integrated google</p>
        <h5>FACEBOOK</h5>
        <button type="button" name="login-facebook">LOG IN</button>
        <p>User has not integrated facebook</p>
      </div>

      <div>
        <h4>ORDER HISTORY</h4>
        {
          dummyOrders.map(order => {
            return (
              <OrderCell key={order.id} order={order} />
            );
          })
        }
      </div>

      <div className="row">
      {dummyReviews.map(review => {
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
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Leftover code from boilerplate user-home.js
    // email: state.user.email
  };
};

export default connect(mapState)(AccountView);

/**
 * PROP TYPES
 */
// Leftover code from user-home.js
// UserHome.propTypes = {
//   email: PropTypes.string
// }
