import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import logger from 'redux-logger';
const initialState = {};

const middleWare = [thunk, logger];

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleWare),
));

export default store;