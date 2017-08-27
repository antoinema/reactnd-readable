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
      editItem: PropTypes.func.isRequired,
      renderItem: PropTypes.func.isRequired
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
          upVote={this.onUpVote}
          downdVote={this.onDowndVote}
          {...this.props}
        />
      )
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      upVote: data => dispatch(upVote(data)),
      downVote: data => dispatch(downVote(data))
      //editPost: data => dispatch(editPost(data))
    }
  }
  return connect(null, mapDispatchToProps)(ItemContainer)
}

export default withVotes
