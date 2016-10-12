import { ADD_TASK, DELETE_TASK } from '../constants/TodosPage'

export function deleteTask(taskTitle){
  return {
    type: DELETE_TASK,
    payload: taskTitle
  };
}

export function addTask(task){
  return {
    type: ADD_TASK,
    payload: task
  };
}
