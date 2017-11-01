import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */
export const SingleProduct = (props) => {
  // const {email} = props

  //Dummy data from Products
  const allProducts = [{ id: 1, name: 'Leash', price: 4.95, description: 'This is the coolest leash you have EVER seen! It also will never break.', image: 'https://www.placecage.com/200/300' }, { id: 2, name: 'Bone', price: 0.95, description: 'This is a bone.', image: 'https://www.placecage.com/g/200/300' }];
  const allReviews = [{ id: 1, stars: 5, title: 'This bone broke', body: 'This is the coolest leash you have EVER seen! It also will never break.' }, { id: 1, stars: 5, title: 'This bone broke', body: 'This is the coolest leash you have EVER seen! It also will never break.' }]

  return (
    <div>
      <div className="LeftText">
        <h3>Product</h3>
        <p>Price</p>
        <button>Cart</button>
        <p>Rating</p>
        <p>Category</p>
      </div>
      <div>
        <img src="http://www.placecage.com/300/300" />
      </div>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      <div>
        {allReviews.map(review => {
          return(
            <div key={review.id}>
              <h2>{review.title}</h2>
              <h3>{review.stars}</h3>
              <p>{review.body}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // email: state.user.email
  }
}

export default connect(mapState)(SingleProduct)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
