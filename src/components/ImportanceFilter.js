import React, { Component } from 'react'
import  ImportanceFilterButton from './ImportanceFilterButton'

export default class ImportanceFilter extends Component {
  constructor(props){
    super(props);
    this.importances = [0, 1, 2 ,3];
  }

  render() {
    return (
      <div className='importance-filter'>
        <h3> Фильтр: {this.props.getImportanceTitleByValue(this.props.importanceFilter)} </h3>
        {
          this.importances.map((item) => {
            return <ImportanceFilterButton key={item} importance = {item} setImportanceFilter = {this.props.setImportanceFilter}  getImportanceTitleByValue = {this.props.getImportanceTitleByValue} />
          })
        }
      </div>
    );
  }


}

