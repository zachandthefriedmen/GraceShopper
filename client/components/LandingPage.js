import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const LandingPage = (props) => {
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

  };
};

export default connect(mapState)(LandingPage);

/**
 * PROP TYPES
 */
