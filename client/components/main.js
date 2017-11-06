import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logout } from '../store';
import Footer from './Footer';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn } = props;

    return (
      <div>
        <div className="navbar navbar-expand-lg navbar-light bg-light">
          <a href="/" className="navbar-brand">BENTO'S BAZAAR</a>
          {/* Can probably be refactored later on, menu doesn't collapse when window.width < 990 */}
          {
            isLoggedIn
              ? <nav className="nav navbar-nav ml-auto" id="navbarTogglerDemo01">
                {/* The navbar will show these links after you log in */}
                <Link className="nav-link" to="/home">Home</Link>
                {/* TODO - create /user/:id  */}
                <Link className="nav-link" to="/products">All Products</Link>
                <Link className="nav-link" to="/cart">Cart</Link>
                <Link className="nav-link" to="/user/:id">Account</Link>
                <a className="btn btn-outline-danger" href="#" onClick={handleClick}>Logout</a>
              </nav>
              : <nav className="nav navbar-nav ml-auto" id="navbarTogglerDemo01">
                {/* The navbar will show these links before you log in */}
                <Link className="nav-link" to="/products">All Products</Link>
                <Link className="nav-link" to="/cart">Cart</Link>
                <Link className="btn btn-outline-success" to="/login">Login</Link>
                <Link className="btn btn-outline-info" to="/signup">Sign Up</Link>
              </nav>
          }
        </div>
        <hr />
        {children}
        <Footer />
      </div>
    );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main));

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
