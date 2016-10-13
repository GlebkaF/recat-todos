import React, { PropTypes, Component } from 'react'
import  ImportanceFilter from './ImportanceFilter'
import  TodosPageItem from './TodosPageItem'
import  CreateTodo from './CreateTodo'

export default class TodosPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      importanceFilter : 0
    }
  }

  render() {
    return (
      <div>
        <h1> React TODOs </h1>
        <CreateTodo addTask = {this.props.addTask} />
        <ImportanceFilter setImportanceFilter = {this.setImportanceFilter.bind(this)} importanceFilter = {this.state.importanceFilter}/>
        {this.renderItems()}
      </div>
    );
  }

  renderItems() {
    const filteredTasks = this.getFilteredByImportanceTasks(this.state.importanceFilter);
    if(!filteredTasks.length) {
      return <h3>Задач нет!</h3>;
    }
    return filteredTasks.map((item) => {
      return <TodosPageItem key = {item.title} {...item}  deleteTask = {this.props.deleteTask} updateTask = {this.props.updateTask}/>
    });
  }

  getFilteredByImportanceTasks(importanceFilter = 0) {
    if (importanceFilter === 0) {
      return this.props.todos;
    }
    return this.props.todos.filter( todo => todo.importance === importanceFilter);
  }

  setImportanceFilter(importanceFilter = 0){
    this.setState({
      importanceFilter : importanceFilter
    });
  }

}


TodosPage.propTypes = {
  todos: PropTypes.array.isRequired
};

