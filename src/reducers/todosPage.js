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

function getStateWithNewTask(
    state = {},
    {
        description = 'No description provided',
        importance = 1,
        deadline = 0,
        isCompleted = 0,
        title
    } = {}
){
  const isTaskValid = (title) && (!state.todos.find(item => item.title === title));
  if(isTaskValid){
    //TODO : заменить на имуталку
    state =  {...state, todos: state.todos.concat({
        description,
        importance,
        deadline,
        isCompleted,
        title
    })};
  }
  else {
    // вместо алерта logger. Логгер сам решит как показывать
    alert('Недопустимое имя или задача с таким именем уже существует');
  }
  return state;
}

function getStateWithUpdatedTask(state, taskTitle, updatedTask){
  const indexOfUpdatingTask = state.todos.findIndex(item => item.title === taskTitle);
  // длинная строка, в fullhd то монитор помещается?
  const isUpdatedTaskValid = (indexOfUpdatingTask != -1) && ((taskTitle === updatedTask.title) ||  (!state.todos.find(item => item.title === updatedTask.title)));
  // пробелыставь
  if (isUpdatedTaskValid) {
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
