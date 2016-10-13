import React, { Component } from 'react'
import  ImportanceFilterButton from './ImportanceFilterButton'
import { IMPORTANCES } from '../constants/TodosPage'

export default class ImportanceFilter extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className='importance-filter'>
        <h3> Фильтр: {IMPORTANCES[this.props.importanceFilter]} </h3>
        {
          IMPORTANCES.map((item, index) => {
            return <ImportanceFilterButton key={index} importance = {index} importanceTitle = {item}  setImportanceFilter = {this.props.setImportanceFilter} />
          })
        }
      </div>
    );
  }


}

