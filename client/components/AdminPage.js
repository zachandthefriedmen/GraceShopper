import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts, fetchCategories, fetchOrders } from '../store';
import AdminUserForm from './AdminUserForm';
import AdminProductForm from './AdminProductForm';
import AdminCategoryForm from './AdminCategoryForm';
import AdminOrderForm from './AdminOrderForm';

/**
 * COMPONENT
 */
export const AdminPage = (props) => {
  // Leftover code from user-home.js (component this was based off of) in case someone else needs it later
  // const {email} = props
  props.fetchInitialData();

  console.log(props.user);
  if (!props.user.admin) return (<h1>Sorry! Only admins can see this page.</h1>);

  return (
    <div>
      {/* 
      Very basic code for tabs in case we choose to explore later
      <button>USERS</button>
      <button>PRODUCTS</button>
      <button>CATEGORIES</button>
      <button>ORDERS</button> */}

      {/* <AdminUserForm /> */}
      <h1>Products</h1>
      <AdminProductForm />
      <h1>Orders</h1>
      <AdminOrderForm />
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
    user: state.user
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchInitialData: () => {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
      dispatch(fetchOrders());
    }
  };
};

export default connect(mapState, mapDispatch)(AdminPage);
