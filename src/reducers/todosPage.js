import { ADD_TASK, DELETE_TASK } from '../constants/TodosPage'
//todo: переименовать imp

const initialState = {
   todos: [],
   importance: 0,
   err: null
  };

export default function todosPage(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      return getStateWithNewTaskOrWithError(state, action.payload);
    case DELETE_TASK:
      return {...state , todos: state.todos.filter(todo => todo.title !== action.payload)};
    default:
      return state;
  }
}

function getStateWithNewTaskOrWithError(state, task){
  var err = null;
  if(!task.title){
    err = 'Empty task title';
  }
  if(state.todos.find(item => item.title === task.title)){
    err = 'Task with such title is already exist';
  }

  if(!err){
    task.description = task.description || 'No description provided';
    task.importance = Number(task.importance) || 1;
    task.deadline = Number(task.deadline) || 0;
    task.isCompleted = Number(task.isCompleted) || 0;
    return {...state, todos: state.todos.concat(task)};
  }
  else {
    return {...state, err};
  }
}
