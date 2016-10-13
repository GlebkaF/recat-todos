import React, { Component } from 'react'

export default class ImportanceFilterButton extends Component {
  render() {
    return (
      <button onClick={this.props.setImportanceFilter.bind(this, this.props.importance)}>
        {this.props.importanceTitle}
      </button>
    );
  }

}
