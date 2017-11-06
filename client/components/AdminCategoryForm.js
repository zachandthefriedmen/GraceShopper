import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminCategoryForm = (props) => {
  const { categories } = props;

  return (
    <div>
      <table>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>OPTIONS</th>
        </tr>
        {
          categories.map(category => {
            return (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
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
    categories: state.categories
  };
};

export default connect(mapState)(AdminCategoryForm);
