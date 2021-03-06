import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './utils';

describe('home page test', () => {
  it('renders home page user management', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    );

    expect(getByText(/User Management/i)).toBeInTheDocument();
    expect(getByText(/Click here to login/i).closest('button')).toBeTruthy();
  });
});