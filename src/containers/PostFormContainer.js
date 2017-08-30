import React, { Component } from 'react'
import PostForm from '../components/PostForm'
import PropTypes from 'prop-types'
import Loading from '../components/Loading'
import {
  inputChanged,
  submitPost,
  newPost,
  editPost
} from '../actions/postForm'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class PostFormContainer extends Component {
  componentDidMount() {
    const { editPost, newPost, match } = this.props
    console.log(this.props)

    match.params.id === 'new' ? newPost() : editPost(match.params.id)
  }
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
    submitPost(fields).then(() => this.props.history.push('/'))
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
    const {
      validation,
      isSubmitting,
      fields,
      categories,
      isFetching
    } = this.props
    const canSubmit = this.validate(validation)
    if (isFetching) return <Loading />

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
  const { fields, isSubmitting, validation, submitted, isFetching } = formPost
  return {
    fields,
    isSubmitting,
    submitted,
    validation,
    isFetching,
    categories: categories
      ? Object.keys(categories).map(key => categories[key])
      : []
  }
}

function mapDispatchToProps(dispatch) {
  return {
    inputChanged: data => dispatch(inputChanged(data)),
    submitPost: data => dispatch(submitPost(data)),
    newPost: () => dispatch(newPost()),
    editPost: data => dispatch(editPost(data))
  }
}
PostFormContainer.propTypes = {
  inputChanged: PropTypes.func.isRequired,
  submitPost: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  post: PropTypes.object,
  validation: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  newPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostFormContainer)
)
