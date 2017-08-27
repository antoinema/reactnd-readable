import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.min.css'
import PostFormContainer from '../containers/PostFormContainer'
import PostsPage from '../containers/PostsPage'
import Header from '../components/Header'
import { Route, withRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route path="/" component={Header} />
        <Route exact path="/" component={PostsPage} />
        <Route exact path="/posts/:id/:type?" component={PostFormContainer} />
        <Route
          exact
          path="/comments/:postid/:commentId/:type?"
          component={Header}
        />
      </div>
    )
  }
}

export default withRouter(App)
