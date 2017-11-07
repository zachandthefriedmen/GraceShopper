import React from 'react';
import { connect } from 'react-redux';
import { editUser } from '../store';
import { Link } from 'react-router-dom';

const AdminUserForm = (props) => {
  const { accounts } = props;

  if (!accounts) return <div />;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <table className="table table-striped" id="productsTable">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>E-MAIL</th>
                <th>ADMIN</th>
                <th>OPTIONS</th>
              </tr>
            </thead>
            <tbody>
              {
                accounts.map(account => {
                  return (
                    <tr key={account.id}>
                      <td>{account.id}</td>
                      <td>{account.fullName}</td>
                      <td>{account.email}</td>
                      <td>{account.admin.toString()}</td>
                      <td>
                        {/* Code to create buttons that trigger promote and delete */}
                        <button onClick={() => disableProductClick(product.id)}><i className="fa fa-times" /></button>
                        <button onClick={() => disableProductClick(product.id)}><i className="fa fa-arrow-up" /></button>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
        <div className="col-md-3">

          <h4>Create Products Form</h4>

        </div>
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    accounts: state.accounts.data,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAllInfo: (id, user) => {
      dispatch(editUser(id, user));
    }
  };
};

export default connect(mapState, mapDispatch)(AdminUserForm);
