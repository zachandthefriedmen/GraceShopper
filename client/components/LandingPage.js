import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const LandingPage = (props) => {
  // Leftover code from user-home.js (component this was based off of) in case someone else needs it later
  // const {email} = props

  return (
    <div className="container">
      <div className="row">
        <div id="leftWell" className="jumbotron col-md-5">
          <h1 className="display-3">Welcome to the Bazaar.</h1>
          <p className="lead">Bento says, 'make yourself at home.'</p>
          <hr className="my-2" />
          <p>Placeholder text.</p>
        </div>

        <div id="rightImage" className="col-md-7">
          <img src="http://www.noahsnaturalpetmarket.com/wp-content/uploads/2011/06/all.jpg" />
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
  };
};

export default connect(mapState)(LandingPage);

/**
 * PROP TYPES
 */
// Leftover code from user-home.js (component this was based off of) in case someone else needs it later
// UserHome.propTypes = {
//   email: PropTypes.string
// }
