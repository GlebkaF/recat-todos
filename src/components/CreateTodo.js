import React, { Component } from 'react'

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
            <select ref='importanceInput'>
              <option value='1'>Обычный</option>
              <option value='2'>Важный</option>
              <option value='3'>Очень важный</option>
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
    let deadline = new Date(this.refs.deadlineInput.value);
    let offset = deadline.getTimezoneOffset();
    deadline = new Date(deadline.getTime() + 1000*60*offset).getTime();
    const task = {
      title: this.refs.titleInput.value,
      description: this.refs.descriptionInput.value,
      importance: this.refs.importanceInput.value,
      deadline: this.refs.noDeadlineInput.checked ? 0 : deadline,
      isCompleted: 0
    };
    this.props.addTask(task);
  }
}


