import React, { Component } from 'react';

class RowAlternator extends Component {
  render() {
    return (
      <tbody>
        {this.props.children.map((row, idx) => {
          if (idx % 2 === 0) {
            return React.cloneElement(row, {
              style: { background: this.props.firstColor },
            });
          }
          return React.cloneElement(row, {
            style: { background: this.props.secondColor },
          });
        })}
      </tbody>
    );
  }
}

export default RowAlternator;
