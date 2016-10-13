import { ADD_TASK, DELETE_TASK, UPDATE_TASK} from '../constants/TodosPage'

export function deleteTask(taskTitle){
  return {
    type: DELETE_TASK,
    payload: taskTitle
  };
}

export function updateTask(oldTaskTitle, updatedTask){
  return {
    type: UPDATE_TASK,
    payload: {
      taskTitle : oldTaskTitle,
      updatedTask
    }
  };
}

export function addTask(task){
  return {
    type: ADD_TASK,
    payload: task
  };
}
