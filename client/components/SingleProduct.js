import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const SingleProduct = (props) => {
  // Leftover code from user-home.js (component this was based off of) in case someone else needs it later
  // const {email} = props

  //Dummy data from Products
  const allReviews = [{ id: 1, stars: 5, title: 'This bone broke', body: 'This is the coolest leash you have EVER seen! It also will never break.' },
                      { id: 2, stars: 5, title: 'This bone broke', body: 'This is the coolest leash you have EVER seen! It also will never break.' },
                      { id: 3, stars: 5, title: 'This bone broke', body: 'This is the coolest leash you have EVER seen! It also will never break.' },
                      { id: 4, stars: 5, title: 'This bone broke', body: 'This is the coolest leash you have EVER seen! It also will never break.' },
                      { id: 5, stars: 5, title: 'This bone broke', body: 'This is the coolest leash you have EVER seen! It also will never break.' },
                    ];
                      

  return (
    <div className="container">
      <div className="row">
        <div id="LeftText" className="jumbotron col-md-5">
          <h1 className="display-3">Product</h1>
          <p className="lead">Rating</p>
          <p className="lead">Price</p>
          <button className="btn btn-primary">Add To Cart</button>
          <hr className="my-2" />
          <p>Category</p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
        <div className="col-md-7">
          <img src="http://www.placecage.com/500/600" />
        </div>
      </div>
      <div className="row">
        {allReviews.map(review => {
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
  }
}

export default connect(mapState)(SingleProduct);

/**
 * PROP TYPES
 */
// Leftover code from user-home.js
// UserHome.propTypes = {
//   email: PropTypes.string
// }
