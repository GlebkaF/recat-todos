import { createStore,  applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';


export default function configureStore(initialState) {
  const engine = createEngine('my-save-key-asd');
  const localStorageMiddleware = storage.createMiddleware(engine);
  const store = createStore(rootReducer, initialState, applyMiddleware(localStorageMiddleware));
  const load = storage.createLoader(engine);
  load(store);
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer)
    })
  }
  return store;
}