import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts, fetchCategories, fetchOrders, fetchAccounts } from '../store';
import AdminUserForm from './AdminUserForm';
import AdminProductForm from './AdminProductForm';
import AdminCategoryForm from './AdminCategoryForm';
import AdminOrderForm from './AdminOrderForm';

/**
 * COMPONENT
 */
export const AdminPage = (props) => {
  props.fetchInitialData();

  if (!props.user.admin) return (<h1>Sorry! Only admins can see this page.</h1>);

  return (
    <div>
      {/*
      Very basic code for tabs in case we choose to explore later
      <button>USERS</button>
      <button>PRODUCTS</button>
      <button>CATEGORIES</button>
      <button>ORDERS</button> */}

      <h1>Users</h1>
      <AdminUserForm />
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
    user: state.user
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchInitialData: () => {
      dispatch(fetchAccounts());
      dispatch(fetchProducts());
      dispatch(fetchCategories());
      dispatch(fetchOrders());
    }
  };
};

export default connect(mapState, mapDispatch)(AdminPage);
