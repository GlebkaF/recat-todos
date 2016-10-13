import { ADD_TASK, DELETE_TASK, UPDATE_TASK, REDUX_STORAGE_LOAD } from '../constants/TodosPage'

const initialState = {
   todos: []
  };

export default function todosPage(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      return getStateWithNewTask(state, action.payload);
    case DELETE_TASK:
      return {...state , todos: state.todos.filter(todo => todo.title !== action.payload)};
    case UPDATE_TASK:
      return getStateWithUpdatedTask(state, action.payload.taskTitle, action.payload.updatedTask);
    case REDUX_STORAGE_LOAD:
      return {
        ...state,
        ...action.payload.todosPage
      };
    default:
      return state;
  }
}

function getStateWithNewTask(state, task){
  const isTaskValid = (task.title) && (!state.todos.find(item => item.title === task.title));
  if(isTaskValid){
    task.description = task.description || 'No description provided';
    task.importance = Number(task.importance) || 1;
    task.deadline = Number(task.deadline) || 0;
    task.isCompleted = Number(task.isCompleted) || 0;
    return {...state, todos: state.todos.concat(task)};
  }
  else {
    alert('Недопустимое имя или задача с таким именем уже существует');
    return state;
  }
}

function getStateWithUpdatedTask(state, taskTitle, updatedTask){
  const indexOfUpdatingTask = state.todos.findIndex(item => item.title === taskTitle);
  const isUpdatedTaskValid = (indexOfUpdatingTask != -1) && ((taskTitle === updatedTask.title) ||  (!state.todos.find(item => item.title === updatedTask.title)));
  if(isUpdatedTaskValid){
    let updatedTodos =  state.todos.slice();
    updatedTodos[indexOfUpdatingTask] = {
      ...updatedTodos[indexOfUpdatingTask],
      ...updatedTask
    };
    return {...state, todos: updatedTodos};
  }
  else {
    alert('Недопустимое имя или задача с таким именем уже существует');
    return state;
  }
}
