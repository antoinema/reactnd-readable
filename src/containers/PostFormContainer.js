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
    this.props.inputChanged({
      fields: { [name]: value },
      validation: { [name]: value.length > 0 }
    })
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

  validate = validation => {
    const fieldsValidationArray = Object.keys(validation).map(
      key => validation[key]
    )
    return (
      fieldsValidationArray.length === 4 &&
      fieldsValidationArray.reduce(
        (fieldsOk, isValid) => isValid && fieldsOk,
        true
      )
    )
  }

  render() {
    const { validation, isSubmitting, fields, categories } = this.props
    const canSubmit = this.validate(validation)
    return (
      <PostForm
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        canSubmit={canSubmit}
        isSubmitting={isSubmitting}
        validation={validation}
        fields={fields}
        categories={categories}
      />
    )
  }
}

function mapStateToProps({ formPost, categories }) {
  const { fields, isSubmitting, validation } = formPost
  return {
    fields,
    isSubmitting,
    validation,
    categories: categories
      ? Object.keys(categories).map(key => categories[key])
      : []
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
  fields: PropTypes.object.isRequired,
  validation: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFormContainer)
