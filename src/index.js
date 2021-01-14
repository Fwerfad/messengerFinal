import React from 'react';
import {render} from 'react-dom';
import App from './App';

import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import thunk from "redux-thunk";
import {Provider} from 'react-redux'

import authReducer from './store/reducers/auth/auth'
import contactsReducer from './store/reducers/contacts/contacts'
import chatsReducer from './store/reducers/chats/chats'
import profileReducer from './store/reducers/profile/profile'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : null;

const rootReducer = combineReducers({
    authReducer: authReducer,
    chatsReducer: chatsReducer,
    contactsReducer: contactsReducer,
    profileReducer: profileReducer
});

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

render(
      <Provider store={store}>
          <App />
      </Provider>,
  document.getElementById("root")
)
