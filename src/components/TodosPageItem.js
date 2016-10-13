import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'

export default class TodosPageItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing: false,
      isExpired: !!(this.props.deadline &&
                    (this.props.deadline - Date.now() < 0) &&
                    (!this.props.isCompleted || this.props.isCompleted > this.props.deadline))
    };
    const checkInterval = 1000;
    // setTimeout когда задача истечет
    this.expireChecker = setInterval(this.setIsExpiredState.bind(this), checkInterval);
  }

  componentWillUnmount(){
    clearInterval(this.expireChecker);
  }

  setIsExpiredState(){
    let isExpired = !!(this.props.deadline && (this.props.deadline - Date.now() < 0) && (!this.props.isCompleted || this.props.isCompleted > this.props.deadline));
      this.setState({
        isExpired
      });
  }

  render() {
    let itemClasses = classNames({
      'todos-page-item': true,
      'todos-page-item-expired': this.state.isExpired
    });
    return (
      <div className={itemClasses}>
        {this.state.isEditing ? this.renderEditTaskForm() : this.renderTask()}
        {this.renderActionsSection()}
      </div>
    );
  }

  renderEditTaskForm() {
    return (
      <div className='update-todo-form'>
        <form onSubmit={this.updateTaskHandler.bind(this)}>
          <p>
            Название:
            <input type='text' ref='titleInput' defaultValue={this.props.title} placeholder='Что же делать?' />
          </p>
          <p>
            Описание:
            <input type='text' ref='descriptionInput' defaultValue={this.props.description}/>
          </p>
          <p>
            Важность:
            <select ref='importanceInput' defaultValue={this.props.importance}>
              <option value='1'>Обычный</option>
              <option value='2'>Важный</option>
              <option value='3'>Очень важный</option>
            </select>
          </p>
          <p>
            Истекает:
            <input type='datetime-local' defaultValue={this.getHtmlDateTimeValue(this.props.deadline)} ref='deadlineInput' />
            <input type='checkbox' ref='noDeadlineInput' defaultChecked={this.props.deadline ? false : true} /> Бессрочное
          </p>
          <p>
            Выполнено:
            <input type='datetime-local' defaultValue={this.getHtmlDateTimeValue(this.props.isCompleted)} ref='isCompletedInput' />
            <input type='checkbox' ref='isNotCompletedInput' defaultChecked={this.props.isCompleted ? false : true}  /> Еще не закончено
          </p>
          <button>Обновить задачу</button>
        </form>
      </div>
    );
  }

  renderTask() {
    const { title, description, importance, deadline, isCompleted } = this.props;
    let deadlineString = deadline ? new Date(deadline).toString().slice(0, 25) : '';
    let completeTimeString = isCompleted ? new Date(isCompleted).toString().slice(0, 25) : '';
    return (
      <div>
        <h3> {title} </h3>
        <p>Описание: {description} </p>
        <p>Важность: {this.props.getImportanceTitleByValue(importance)} </p>
        <p>{deadlineString ? `Истекает: ${deadlineString}` : 'Бессрочная задача'} </p>
        <p>{completeTimeString ? `Завершено: ${completeTimeString}` : 'Не завершено'}</p>
      </div>
    );
  }

  renderActionsSection() {
    return (
      <div>
        <button ref='toggleComplete' onClick={this.toggleComplete.bind(this)}> {this.props.isCompleted ? 'Отметить как невыполненную' : 'Отметить как выполненную' } </button>
        <button ref='togleEdit' onClick={this.toggleEdit.bind(this)}> {this.state.isEditing ? 'Отменить' : 'Редактировать' } </button>
        <button ref='deleteTask' onClick={this.deleteHandler.bind(this)}> Удалить </button>
      </div>
    );
  }

  deleteHandler(){
    this.props.deleteTask(this.props.title);
  }

  toggleComplete(){
    let updatedTask = {
      isCompleted:  this.props.isCompleted ? 0 : Date.now()
    }
    this.props.updateTask(this.props.title, updatedTask);
  }

  toggleEdit(){
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  updateTaskHandler(e){
    e.preventDefault();
    let deadline = new Date(this.refs.deadlineInput.value);
    let isCompleted = new Date(this.refs.isCompletedInput.value);
    let offset = deadline.getTimezoneOffset();
    deadline = new Date(deadline.getTime() + 1000*60*offset).getTime();
    isCompleted = new Date(isCompleted.getTime() + 1000*60*offset).getTime();
    const updatedTask = {
      title: this.refs.titleInput.value,
      description: this.refs.descriptionInput.value,
      importance: Number(this.refs.importanceInput.value),
      deadline: this.refs.noDeadlineInput.checked ? 0 : deadline,
      isCompleted: this.refs.isNotCompletedInput.checked ? 0 : isCompleted
    };
    this.props.updateTask(this.props.title, updatedTask);
    this.setState({
      isEditing: false
    });
    this.setIsExpiredState();
  }

  getHtmlDateTimeValue(time){
    if(time == 0) time = Date.now();
    let date = new Date(time);
    let outputString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().length == 1 ? '0' : ''}${date.getMonth() + 1}-${(date.getDate()).toString().length == 1 ? '0' : ''}${date.getDate()}T${(date.getHours()).toString().length == 1 ? '0' : ''}${date.getHours()}:${(date.getMinutes()).toString().length == 1 ? '0' : ''}${date.getMinutes()}`;
    return outputString;
  }

}

TodosPageItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  importance: PropTypes.number.isRequired,
  deadline: PropTypes.number.isRequired,
  isCompleted: PropTypes.number.isRequired
}
