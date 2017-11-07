import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Footer = (props) => {
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

};

export default connect(mapState)(Footer);

/**
 * PROP TYPES
 */
