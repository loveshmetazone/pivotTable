import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import AppReducers from '../reducers';

/**
 * @author Lovesh Singh.
 * @since 25-05-2023.
 * @description redux store.
 */
const store = createStore(
    AppReducers,
    {},
    compose(applyMiddleware(thunk)) // for development only.
);

export default store;
