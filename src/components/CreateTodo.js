import React, { Component } from 'react'
import { IMPORTANCES } from '../constants/TodosPage'
import { normalizeDateTimeInput } from '../utilities/todosUtilities'

export default class CreateTodo extends Component {
  render() {
    return (
      <div className='create-todo-form'>
        <form onSubmit={this.createHandler.bind(this)}>
          <p>
            Название:
            <input type='text' ref='titleInput' defaultValue='Просто задача' placeholder='Что же делать?' />
          </p>
          <p>
            Описание:
            <input type='text' ref='descriptionInput'/>
          </p>
          <p>
            Важность:
            <select ref='importanceInput' defaultValue='1'>
              {
                IMPORTANCES.map((item, index) => {
                  if (index > 0) {
                    return (
                      <option key = {index} value={index}>{item}</option>
                    );
                  }
                })
              }
            </select>
          </p>
          <p>
            Истекает:
            <input type='datetime-local' ref='deadlineInput' />
            <input type='checkbox' defaultChecked='true' ref='noDeadlineInput' /> Бессрочное
          </p>
          <button>Добавить задачу</button>
        </form>
      </div>
    );
  }


  createHandler(e){
    e.preventDefault();
    let deadline = normalizeDateTimeInput(this.refs.deadlineInput.value);
    const task = {
      title: this.refs.titleInput.value,
      description: this.refs.descriptionInput.value,
      importance: Number(this.refs.importanceInput.value),
      deadline: this.refs.noDeadlineInput.checked ? 0 : deadline,
      isCompleted: 0
    };
    this.props.addTask(task);
  }
}
