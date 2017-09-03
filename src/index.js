import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import ReactDOM from 'react-dom'
import './index.css'
import App from './containers/App'
import { createLogger } from 'redux-logger'
import registerServiceWorker from './registerServiceWorker'
import rootReducer from './reducers'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import callAPIMiddleware from './utils/callAPIMiddleware'

const loggerMiddleware = createLogger()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunkMiddleware, loggerMiddleware, callAPIMiddleware)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
