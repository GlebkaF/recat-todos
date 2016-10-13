import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TodosPage from '../components/TodosPage'
import * as todosPageActions from '../actions/TodosPageActions'

class App extends Component {
  render() {
    return (
        <TodosPage {...this.props.todosPage} {...this.props.todosPageActions}/>
    );
  }
}

function mapStateToProps (state = {}) {
  return {
    todosPage: state.todosPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    todosPageActions: bindActionCreators(todosPageActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
