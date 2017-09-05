import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

function withVotes(Item, voteAction) {
  class ItemContainer extends Component {
    static propTypes = {
      vote: PropTypes.func.isRequired
    }

    onUpVote = data => {
      this.props.vote(data, 'upVote')
    }

    onDownVote = data => {
      this.props.vote(data, 'downVote')
    }

    render() {
      return (
        <Item
          {...this.props}
          upVote={this.onUpVote}
          downVote={this.onDownVote}
        />
      )
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      vote: (data, direction) => dispatch(voteAction(data, direction))
    }
  }
  return connect(null, mapDispatchToProps)(ItemContainer, voteAction)
}

export default withVotes
