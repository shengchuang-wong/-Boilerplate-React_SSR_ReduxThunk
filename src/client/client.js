// Startup point for the client application
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import Routes from 'client/Routes';
import reducers from 'client/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

const axiosInstance = axios.create({
  baseURL: '/api'
});

const store = createStore(reducers, window.INITIAL_STATE, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(axiosInstance), logger)))

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));