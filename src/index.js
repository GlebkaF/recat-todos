import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'


let todos = [
  {
    'title': 'Сделать TODOs app',
    'description': 'Необходимо написать TODO лист, с отслеживанием времени задачи и прочим',
    'importance': 3,
    'deadline': 0,
    'isCompleted': 0
  },
  {
    'title': 'Wash the dishes',
    'description': 'Just a simple task',
    'importance': 1,
    'deadline': 1000,
    'isCompleted': 800
  },
  {
    'title': 'asasasdqweqwe',
    'description': 'asdmklasdfjklasjdfkljasdklfjklasdf',
    'importance': 2,
    'deadline': 1200,
    'isCompleted': 0
  },
];

const store = configureStore({
  todosPage : {
    todos : todos,
    importance : 0,
    err: null
  }
});


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);