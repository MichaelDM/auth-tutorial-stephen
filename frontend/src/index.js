import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import thunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/app';
import { NoMatch } from './components/NoMatch';
import SensitiveData from './components/SensitiveData';
import Test from './components/test';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import authHOC from './components/HOC/authHOC';
import { SIGN_IN } from './actions/authAction';

const createStoreWithMiddleware = applyMiddleware(
  thunk,
)(createStore );
const store = createStoreWithMiddleware(reducers, window.devToolsExtension && window.devToolsExtension())
const token = localStorage.getItem('authorization');
// if have token, consider user to be signed in
if (token) {
  // we need to update application state (we are actually creating an instance of redux store ahead of time)
  store.dispatch({ type: SIGN_IN }) // dispatch is a property of the store
}

ReactDOM.render(
<Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Test} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/sensitivedata" component={authHOC(SensitiveData)} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
</Provider>
, document.getElementById('container'));
