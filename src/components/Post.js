import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import moment from 'moment'
import withVotes from '../helpers/withVotes'
import { votePost } from '../actions/posts'

function Post(props) {
  const { post, upVote, downVote, deletePost } = props
  function handleUpVoteClick(e) {
    e.preventDefault()
    upVote(post)
  }
  function handleDownVoteClick(e) {
    e.preventDefault()
    downVote(post)
  }

  function handleDeleteClick(e) {
    e.preventDefault()
    deletePost(post)
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
              <Link
                to={{
                  pathname: `/posts/${post.id}`,
                  state: { from: props.location.pathname }
                }}
              >
                {post.title}
              </Link>
            </strong>{' '}
            {post.comments &&
              <span className="tag is-rounded">
                {post.comments.length}
              </span>}{' '}
            <small>{post.author}</small>{' '}
            <small>{formatTimeStamp(post.timestamp)}</small> <br />
            {post.body}
          </p>
        </div>
        {props.children}
      </div>
      <div className="media-right">
        <div className="field has-addons">
          <p className="control">
            <a className="button" onClick={handleDeleteClick}>
              <span className="icon is-small">
                <i className="fa fa-trash" />
              </span>
            </a>
          </p>
          <p className="control">
            <Link
              to={{
                pathname: `/posts/${post.id}/edit`,
                state: { from: props.location.pathname }
              }}
              className="button"
            >
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
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  children: PropTypes.node,
  location: PropTypes.object
}

export default withRouter(withVotes(Post, votePost))
