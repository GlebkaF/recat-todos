import React, { Component } from 'react'

export default class ImportanceFilterButton extends Component {

  render() {
    return (
      <button onClick={this.setImportanceFilter.bind(this)}>
        {this.props.getImportanceTitleByValue(this.props.importance)}
      </button>
    );
  }

  setImportanceFilter(){
    this.props.setImportanceFilter(this.props.importance);
  }
}
