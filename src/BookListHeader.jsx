import React, { Component } from 'react';

class BookListHeader extends Component {
  shouldComponentUpdate = (
    nextProps,
  ) => nextProps.searchCount !== this.props.searchCount;

  render() {
    return (
      <span className="text-center">
        <h3>Total Results: {this.props.searchCount}</h3>
      </span>
    );
  }
}

export default BookListHeader;
