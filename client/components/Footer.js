import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Footer = (props) => {
  // Leftover code from user-home.js (component this was based off of) in case someone else needs it later
  // const {email} = props;

  return (
    <div>
      <a href="/">
        <img src="http://www.placecage.com/50/50" />
      </a>
      <p>Brought to you by:</p>
      <p>Zachary Friedman</p>
      <p>Matthew Thor</p>
      <p>Rick Polidoro</p>
      <p>Benjamin Odisho</p>
      <p>&copy;</p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  // Leftover code from user-home.js (component this was based off of) in case someone else needs it later
  // return {
  //   email: state.user.email,
  // };
};

export default connect(mapState)(Footer);

/**
 * PROP TYPES
 */
// Leftover code from user-home.js (component this was based off of) in case someone else needs it later
// UserHome.propTypes = {
//   email: PropTypes.string,
// };
