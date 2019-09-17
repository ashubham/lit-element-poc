declare global {
    interface Window {
      process?: Object;
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

import {
    createStore,
    compose,
    applyMiddleware,
    combineReducers,
    Reducer,
    StoreEnhancer
  } from 'redux';
  import thunk, { ThunkMiddleware } from 'redux-thunk';
  import logger from 'redux-logger';
  import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';


export interface RootState {

}

export type RootAction = any;


const devCompose: <Ext0, Ext1, StateExt0, StateExt1>(
  f1: StoreEnhancer<Ext0, StateExt0>, f2: StoreEnhancer<Ext1, StateExt1>
) => StoreEnhancer<Ext0 & Ext1, StateExt0 & StateExt1> =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    state => state as Reducer,
    devCompose(
        lazyReducerEnhancer(combineReducers),
        applyMiddleware(thunk as ThunkMiddleware<RootState, RootAction>, logger))
)