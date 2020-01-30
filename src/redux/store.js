import {applyMiddleware, createStore} from "redux";
import {persistStore} from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';
import createSagaMiddleware from 'redux-saga';
import {fetchCollectionsStart} from "./shop/shop.sagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development'){
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

//this code should be executed after applying moddlewares
sagaMiddleware.run(fetchCollectionsStart);

export const persistor = persistStore(store);

export default {store, persistor};
