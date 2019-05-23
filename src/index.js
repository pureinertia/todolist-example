import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import routes from './routes';
import { authenticate } from './reducers/auth';
import './index.scss';

const history = createBrowserHistory();

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
store.dispatch(authenticate());

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <HashRouter>
        {routes}
      </HashRouter>
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
