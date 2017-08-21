import React from 'react'
import PropTypes from 'prop-types'

function Post(props) {
  const {post, upVote, downVote} = props
  function handleUpVoteClick(e) {
    e.preventDefault()
    upVote(post)
  }
  function handleDownVoteClick(e) {
    e.preventDefault()
    downVote(post)
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
              <span className="icon is-small"><i className="fa fa-plus"></i></span>
            </a>
          </div>
          <div className="level-item">
            <a onClick={handleDownVoteClick}>
              <span className="icon is-small"><i className="fa fa-minus"></i></span>
            </a>
          </div>
        </nav>

      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{post.title}</strong> <small>{post.author}</small> <small>{post.timestamp}</small>
            <br/>
            {post.body}
          </p>
        </div>
      </div>
      <div className="media-right">
        <div className="field has-addons">
          <p className="control">
            <a className="button">
              <span className="icon is-small">
                <i className="fa fa-trash"></i>
              </span>
            </a>
          </p>
          <p className="control">
            <a className="button">
              <span className="icon is-small">
                <i className="fa fa-edit"></i>
              </span>
            </a>
          </p>
        </div>  

      </div>
    </article>
  )
}

Post.propTypes = {
  post: PropTypes.object,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired
}

export default Post
