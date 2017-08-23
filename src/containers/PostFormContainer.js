import React, { Component } from 'react'
import PostForm from '../components/PostForm'
import PropTypes from 'prop-types'
import { inputChanged, submitPost } from '../actions/postForm'
import { v1 as uuidv1 } from 'uuid'
import { connect } from 'react-redux'

class PostFormContainer extends Component {
  handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.props.inputChanged({ [name]: value })
  }

  handleSubmit = () => {
    const { fields, submitPost } = this.props
    const post =
      fields.id === undefined
        ? {
          ...fields,
          id: uuidv1(),
          timestamp: Date.now(),
          voteScore: 1,
          deleted: false
        } // new post
        : { ...fields } // edit post
    submitPost(post)
  }

  render() {
    return (
      <PostForm
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

function mapStateToProps({ formPost }) {
  const { fields } = formPost
  return {
    fields: fields ? fields : {}
  }
}

function mapDispatchToProps(dispatch) {
  return {
    inputChanged: data => dispatch(inputChanged(data)),
    submitPost: data => dispatch(submitPost(data))
  }
}
PostFormContainer.propTypes = {
  inputChanged: PropTypes.func.isRequired,
  submitPost: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFormContainer)
