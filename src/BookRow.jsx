import React, { Component } from 'react';

class BookRow extends Component {
  shouldComponentUpdate = (
    nextProps,
  ) => nextProps.title !== this.props.title
    || nextProps.author_name !== this.props.author_name
    || nextProps.edition_count !== this.props.edition_count;

  render() {
    return (
      <tr style={this.props.style}>
        <td>
          <h4>#{this.props.index}</h4>
        </td>
        <td>
          <h4>{this.props.title}</h4>
        </td>
        <td>
          <h4>
            {(this.props.author_name || []).join(', ')}
          </h4>
        </td>
        <td>
          <h4>{this.props.edition_count}</h4>
        </td>
      </tr>
    );
  }
}

export default BookRow;
