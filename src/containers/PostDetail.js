import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { loadPost } from '../actions/posts'
import { loadComments } from '../actions/comments'
import Post from '../components/Post'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Loading from '../components/Loading'
import { getCommentsForId } from '../reducers'
import CommentFormContainer from './CommentFormContainer'
import Modal, { ModalCardFooter } from '../components/Modal'
import { showCommentEdit, hideCommentEdit } from '../actions/ui'
import { submit } from 'redux-form'

class PostDetail extends Component {
  static propTypes = {
    post: PropTypes.object,
    comments: PropTypes.array,
    loadPost: PropTypes.func.isRequired,
    loadComments: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    postId: PropTypes.number,
    match: PropTypes.object,
    history: PropTypes.object,
    isEditingComment: PropTypes.bool,
    showCommentEdit: PropTypes.func.isRequired,
    hideCommentEdit: PropTypes.func.isRequired,
    submitEdit: PropTypes.func.isRequired,
    currentlyEditingComment: PropTypes.string
  }

  state = {
    modalIsOpen: false
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  componentWillMount() {
    const { match, loadPost, loadComments } = this.props
    const postId = match.params.postId
    loadPost(postId)
    loadComments(postId)
  }

  renderModal(commentId, parentPostId) {
    const {
      showCommentEdit,
      hideCommentEdit,
      isEditingComment,
      submitEdit
    } = this.props
    return (
      <Modal
        visible={isEditingComment}
        onOpen={showCommentEdit}
        onClose={hideCommentEdit}
        title="Edit comment"
        showClose={true}
        footer={
          <ModalCardFooter>
            <button className="button is-success" onClick={submitEdit}>
              Save changes
            </button>
            <button className="button" onClick={hideCommentEdit}>
              Cancel
            </button>
          </ModalCardFooter>
        }
      >
        <CommentFormContainer
          parentPostId={parentPostId}
          commentId={commentId}
        />
      </Modal>
    )
  }
  render() {
    const {
      post,
      comments,
      isFetching,
      isEditingComment,
      currentlyEditingComment
    } = this.props
    if (isFetching) return <Loading />

    return (
      <div className="section">
        <Post key={post.id} post={post} comments={comments} />
        {isEditingComment && this.renderModal(currentlyEditingComment, post.id)}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { posts, ui } = state
  const { isFetching, isEditingComment, currentlyEditingComment } = ui
  const { match } = ownProps
  const postId = match.params.postId
  return {
    post: posts.postsById[postId],
    comments: getCommentsForId(state, postId),
    isFetching,
    isEditingComment,
    currentlyEditingComment
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPost: data => dispatch(loadPost(data)),
    loadComments: data => dispatch(loadComments(data)),
    showCommentEdit: () => dispatch(showCommentEdit()),
    hideCommentEdit: () => dispatch(hideCommentEdit()),
    submitEdit: () => dispatch(submit('comments'))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetail)
)
