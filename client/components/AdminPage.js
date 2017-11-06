import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchProducts, fetchCategories, fetchOrders } from '../store';
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

  return (
    <div>
      <button>USERS</button>
      <button>PRODUCTS</button>
      <button>CATEGORIES</button>
      <button>ORDERS</button>

      <AdminUserForm />
      <AdminProductForm />
      <AdminCategoryForm />
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAllInfo: () => {
      dispatch(fetchUsers());
      dispatch(fetchProducts());
      dispatch(fetchCategories());
      dispatch(fetchOrders());
    }
  };
};

export default connect(mapState, mapDispatch)(AdminPage);
