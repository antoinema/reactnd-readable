import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadItem, submitItem } from '../actions/posts'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Loading from '../components/Loading'

function withInitAndSubmit(ItemForm, endPoint) {
  class FormContainer extends Component {
    static propTypes = {
      initialValues: PropTypes.object,
      history: PropTypes.object.isRequired,
      submitItem: PropTypes.func.isRequired,
      loadItem: PropTypes.func.isRequired,
      isFetching: PropTypes.bool.isRequired,
      itemId: PropTypes.number,
      match: PropTypes.object
    }

    componentWillMount() {
      const itemId = this.props.itemId || this.props.match.params.id
      this.props.loadItem(itemId, endPoint)
    }

    handleSubmit = fields => {
      this.props
        .submitItem(fields, endPoint)
        .then(() => this.props.history.push('/'))
    }
    render() {
      const { isFetching } = this.props
      if (isFetching) return <Loading />

      return <ItemForm onSumbit={this.handleSubmit} {...this.props} />
    }
  }

  function mapStateToProps({ items }, ownProps) {
    const isFetching = items[endPoint].isFetching
    const { match } = ownProps
    const itemId = ownProps.itemId || match.params.id
    return {
      initialValues: items[endPoint].byId[itemId],
      isFetching
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      submitItem: (item, endPoint) => dispatch(submitItem(item, endPoint)),
      loadItem: (item, endPoint) => dispatch(loadItem(item, endPoint))
    }
  }

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(FormContainer))
}
export default withInitAndSubmit
