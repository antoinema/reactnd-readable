import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { upVote, downVote } from '../actions/posts'
import { editPost } from '../actions/postForm'

function withVotes(Item, endPoint) {
  class ItemContainer extends Component {
    static propTypes = {
      item: PropTypes.object,
      upVote: PropTypes.func.isRequired,
      downVote: PropTypes.func.isRequired,
      editItem: PropTypes.func.isRequired
    }

    onUpVote = data => {
      this.props.upVote(data, endPoint)
    }

    onDownVote = data => {
      this.props.downVote(data, endPoint)
    }

    render() {
      return (
        <Item
          {...this.props}
          upVote={this.onUpVote}
          downVote={this.onDowndVote}
        />
      )
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      upVote: (data, endPoint) => dispatch(upVote(data, endPoint)),
      downVote: (data, endPoint) => dispatch(downVote(data, endPoint))
    }
  }
  return connect(null, mapDispatchToProps)(ItemContainer)
}

export default withVotes
