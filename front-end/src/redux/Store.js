import { compose, applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import logger from 'redux-logger';
import RootReducer from './RootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// logger will be used to catch and display the actions whenever they are fired
// before the action dispatched reaches the reducers, it reaches the middleWares first
const middleWares = [logger]; // array of middleWare

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, RootReducer);
const composedEnhancers = compose(applyMiddleware(...middleWares));
const Store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(Store);
export default Store;
