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
    <footer>
      <a href="/">
        <img src="http://www.placecage.com/50/50" />
      </a>
      <ul>
      <li><b>Brought to you by:</b></li>
      <li>Zachary Friedman</li>
      <li>Matthew Thor</li>
      <li>Rick Polidoro</li>
      <li>Benjamin Odisho</li>
      <li>&copy;</li>
      </ul>
    </footer>
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
