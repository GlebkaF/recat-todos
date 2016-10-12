import React, { PropTypes, Component } from 'react'
import  ImportanceFilter from './ImportanceFilter'
import  TodosPageItem from './TodosPageItem'
import  CreateTodo from './CreateTodo'

export default class TodosPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      importanceFilter : this.props.importance
    }
  }

  render() {
    return (
      <div>
        <CreateTodo addTask = {this.props.addTask} />
        <ImportanceFilter setImportanceFilter = {this.setImportanceFilter.bind(this)} importanceFilter = {this.state.importanceFilter} getImportanceTitleByValue = {this.getImportanceTitleByValue} />
        {this.renderItems()}
      </div>
    );
  }

  renderItems(){
    const filteredTasks = this.getFilteredByImportanceTasks();
    return filteredTasks.map((item) => {
      return <TodosPageItem key = {item.title} {...item} deleteTask = {this.props.deleteTask}/>
    })
  }

  getFilteredByImportanceTasks(){
    if(this.state.importanceFilter === 0) return this.props.todos;
    return this.props.todos.filter( todo => todo.importance === this.state.importanceFilter);
  }

  setImportanceFilter(importance = 0){
    this.setState({
      importanceFilter : importance
    });
  }

  getImportanceTitleByValue(value){
    switch (value) {
      case 0 :
        return 'Все';
      case 1 :
        return 'Обычные';
      case 2 :
        return 'Важные';
      case 3 :
        return 'Очень важные';
      default:
        return 'Неизвестное значение важности';
    }
  }


}


TodosPage.propTypes = {
  todos: PropTypes.array.isRequired,
  importance: PropTypes.number.isRequired
};

