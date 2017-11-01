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
    <div>
      <div id="leftWell">
        <h1>Welcome to the Bazaar.</h1>
        <h2>Bento says, 'make yourself at home.'</h2>
        <p>Placeholder text.</p>
      </div>

      <div id="rightImage">
        <img src="http://www.placecage.com/c/300/300" />
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

export default connect(mapState)(LandingPage);

/**
 * PROP TYPES
 */
// Leftover code from user-home.js
// UserHome.propTypes = {
//   email: PropTypes.string
// }
