import React, { PropTypes, Component } from 'react'

export default class TodosPageItem extends Component {
  render() {
    const { title, description, importance, deadline, isCompleted } = this.props;
    return (
      <div className='todos-page-item'>
        <h3> {title} - {importance}</h3>
        <p>Описание: {description} </p>
        <p>Истекает {deadline} </p>
        <p>Выполнен: {isCompleted} </p>
        <button ref='editTask' onClick={this.editHandler.bind(this)}> Редактировать </button>
        <button ref='deleteTask' onClick={this.deleteHandler.bind(this)}> Удалить </button>
      </div>
    );
  }

  deleteHandler(){
    this.props.deleteTask(this.props.title);
    return '';
  }

  editHandler(){
    return '';
  }

  chancelEditHandler(){
    return '';
  }
}

TodosPageItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  importance: PropTypes.number.isRequired,
  deadline: PropTypes.number.isRequired,
  isCompleted: PropTypes.number.isRequired
}
