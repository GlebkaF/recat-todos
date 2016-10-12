import { createStore,  applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import { ping } from '../enhancers/ping' // <!-- подключаем наш enhancer

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, applyMiddleware(ping)); // <!-- добавляем его в цепочку middleware'ов);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer)
    })
  }
  return store;
}