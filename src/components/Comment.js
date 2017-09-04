import React from 'react'
import PropTypes from 'prop-types'
import { voteComment } from '../actions/comments'
import withVotes from '../helpers/withVotes'
import moment from 'moment'

const Comment = props => {
  const { comment, upVote, downVote } = props

  function handleUpVoteClick(e) {
    e.preventDefault()
    upVote(comment)
  }
  function handleDownVoteClick(e) {
    e.preventDefault()
    downVote(comment)
  }
  function handleEditClick(e) {
    e.preventDefault()
    props.showCommentEdit(comment.id)
  }
  function handleDeleteClick(e) {
    e.preventDefault()
    props.deleteComment(comment)
  }

  function formatTimeStamp(ts) {
    return moment(ts).format('lll')
  }

  return (
    <article className="media">
      <figure className="media-left">
        <nav className="level is-marginless">
          <div className="level-item is-size-5">
            {comment.voteScore}
          </div>
        </nav>
        <nav className="level">
          <div className="level-item">
            <a onClick={handleUpVoteClick}>
              <span className="icon is-small">
                <i className="fa fa-plus" />
              </span>
            </a>
          </div>
          <div className="level-item">
            <a onClick={handleDownVoteClick}>
              <span className="icon is-small">
                <i className="fa fa-minus" />
              </span>
            </a>
          </div>
        </nav>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>
              {comment.author}
            </strong>
            <br />
            {comment.body}
            <br />
            <small>
              <a onClick={handleEditClick}>Edit</a> ·{' '}
              <a onClick={handleDeleteClick}>Delete</a> ·
              {formatTimeStamp(comment.timestamp)}
            </small>
          </p>
        </div>
      </div>
    </article>
  )
}
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  downVote: PropTypes.func.isRequired,
  upVote: PropTypes.func.isRequired,
  showCommentEdit: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
}
export default withVotes(Comment, voteComment)
