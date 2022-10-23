import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import RootReducer from './RootReducer';

// logger will be used to catch and display the actions whenever they are fired
// before the action dispatched reaches the reducers, it reaches the middleWares first
const middleWares = [logger]; // array of middleWare
const composedEnhancers = compose(applyMiddleware(...middleWares));
const Store = createStore(RootReducer, undefined, composedEnhancers);

export default Store;
