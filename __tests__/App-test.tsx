/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../components/App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import placeReducer from '../reducers/placeReducer';

import renderer from 'react-test-renderer';
const store = createStore(placeReducer);

it('renders correctly', () => {
  renderer.create(
    <Provider store={store}>
      <App />
    </Provider>,
  );
});
