import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.min.css'
import PostsPage from '../containers/PostsPage'
import PostDetail from '../containers/PostDetail'
import Header from '../components/Header'
import PostFormContainer from '../containers/PostFormContainer'
import ErrorMessage from '../components/ErrorMessage'
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
        <Route exact path="/:category" component={PostsPage} />
        <Route exact path="/post/new" component={PostFormContainer} />
        <Route
          exact
          path="/category/:category/:postId/edit"
          component={PostFormContainer}
        />
        <Route
          exact
          path="/category/:category/:postId"
          component={PostDetail}
        />
      </div>
    )
  }
}

function mapStateToProps({ ui }) {
  return {
    errorMessage: ui.errorMessage
  }
}

export default withRouter(connect(mapStateToProps, null)(App))
