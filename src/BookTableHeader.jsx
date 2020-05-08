/* eslint-disable jsx-a11y/control-has-associated-label,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

class BookTableHeader extends Component {
  shouldComponentUpdate = () => false;

  render() {
    return (
      <thead>
        <tr>
          <th />
          <th>
            <h3>
              <a href="#" onClick={this.props.sortByTitle}>
                Title
              </a>
            </h3>
          </th>
          <th>
            <h3>Author</h3>
          </th>
          <th>
            <h3>No. of Editions</h3>
          </th>
        </tr>
      </thead>
    );
  }
}

export default BookTableHeader;
