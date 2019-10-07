import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from 'client/components/Header';
import { fetchCurrentUser } from 'client/actions'

const App = ({ route }) => {
  return (
    <div>
      <Header />
      {renderRoutes(route.routes)}
    </div>
  )
};

export default {
  component: App,
  fetchInitialData: ({ dispatch }) => dispatch(fetchCurrentUser())
};