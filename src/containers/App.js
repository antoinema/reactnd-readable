import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.min.css'
import PostsPage from '../containers/PostsPage'
import Header from '../components/Header'
import PostForm from '../components/PostForm'
import ErrorMessage from '../components/ErrorMessage'
import CommentForm from '../components/CommentForm'
import { Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class App extends Component {
  static propTypes = {
    errorMessage: PropTypes.string
  }
  render() {
    const { errorMessage } = this.props
    return (
      <div className="app">
        <Route path="/" component={Header} />
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        <Route exact path="/" component={PostsPage} />
        <Route exact path="/posts/:id/:type?" component={PostForm} />
        <Route exact path="/posts/:posts/" component={Header} />
        <Route
          exact
          path="/posts/:postid/comments/:id?/:type?"
          component={CommentForm}
        />
      </div>
    )
  }
}

function mapStateToProps(errorMessage) {
  return errorMessage
}

export default withRouter(connect(mapStateToProps, null)(App))
