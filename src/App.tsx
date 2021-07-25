import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { NotFound, PrivateRoute } from './components/Common';
import { AdminLayout } from './components/Layout';
import LoginPage from './features/auth/pages/LoginPage';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './utils';

function App() {

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path='/'>
          <LoginPage />
        </Route>

        <Route path='/login'>
          <LoginPage />
        </Route>

        <PrivateRoute path='/admin'>
          <AdminLayout />
        </PrivateRoute>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
