import React, { Component } from 'react';

class Header extends Component {
  shouldComponentUpdate = () => false;

  render() {
    return (
      <div className="row" style={this.props.style}>
        <div className="col-lg-8 col-lg-offset-2">
          <h1>Open Library | Search any book you want!</h1>
        </div>
      </div>
    );
  }
}

export default Header;
