import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import withVotes from '../helpers/withVotes'
import { votePost } from '../actions/posts'
import Comments from './Comments'
import CommentFormContainer from '../containers/CommentFormContainer'

function Post(props) {
  const { post, upVote, downVote, comments } = props
  function handleUpVoteClick(e) {
    e.preventDefault()
    upVote(post)
  }
  function handleDownVoteClick(e) {
    e.preventDefault()
    downVote(post)
  }

  function formatTimeStamp(ts) {
    return moment(ts).format('lll')
  }

  return (
    <article className="media">
      <figure className="media-left">
        <nav className="level is-marginless">
          <div className="level-item is-size-5">
            {post.voteScore}
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
              {' '}<Link to={`/posts/${post.id}`}>{post.title}</Link>
            </strong>{' '}
            <small>{post.author}</small>{' '}
            <small>{formatTimeStamp(post.timestamp)}</small>
            <br />
            {post.body}
          </p>
        </div>
        {comments && <Comments comments={comments} />}
        <CommentFormContainer parentPostId={post.id} showSubmit={true} />
      </div>
      <div className="media-right">
        <div className="field has-addons">
          <p className="control">
            <a className="button">
              <span className="icon is-small">
                <i className="fa fa-trash" />
              </span>
            </a>
          </p>
          <p className="control">
            <Link to={`/posts/${post.id}/edit`} className="button">
              <span className="icon is-small">
                <i className="fa fa-edit" />
              </span>
            </Link>
          </p>
        </div>
      </div>
    </article>
  )
}

Post.propTypes = {
  post: PropTypes.object,
  comments: PropTypes.array,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired
}

export default withVotes(Post, votePost)
