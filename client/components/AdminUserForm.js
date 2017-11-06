import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminUserForm = (props) => {
  const { users } = props;

  return (
    <div>
      <table>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>OPTIONS</th>
        </tr>
        {
          props.users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>OPTIONS</td>
              </tr>
            );
          })
        }
      </table>
    </div>
  );
};

const mapState = state => {
  return {
    users: state.users
  };
};

export default connect(mapState)(AdminUserForm);
