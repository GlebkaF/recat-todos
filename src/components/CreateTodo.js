import React, { Component } from 'react'

export default class CreateTodo extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className='create-todo-form'>
        <form onSubmit={this.createHandler.bind(this)}>
          <p>
            Название:
            <input type='text' ref='titleInput' placeholder='Что же делать?' />
          </p>
          <p>
            Описание:
            <input type='text' ref='descriptionInput'/>
          </p>
          <p>
            Время выполнения:
            <input type='datetime-local' ref='deadlineInput' />
          </p>
          <p>
            Важность:
            <select ref='importanceInput'>
            <option value='1'>Обычный</option>
            <option value='2'>Важный</option>
            <option value='3'>Очень важный</option>
            </select>
          </p>
          <button>Добавить задачу</button>
        </form>
      </div>
    );
  }

  createHandler(e){
    e.preventDefault();
    const task = {
      title: this.refs.titleInput.value,
      description: this.refs.titleInput.value,
      importance: this.refs.importanceInput.value,
      deadline: this.refs.deadlineInput.value,
      isCompleted: 0
    };
    this.props.addTask(task);
    return '';
  }
}


