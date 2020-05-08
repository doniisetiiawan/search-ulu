import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    };
  }

  shouldComponentUpdate = () => false;

  _submitForm = () => {
    this.props.performSearch(this.state.searchTerm);
  };

  render() {
    return (
      <div className="row" style={this.props.style}>
        <div>
          <div className="input-group">
            <input
              type="text"
              className="form-control input-lg"
              placeholder="Search books..."
              onChange={(event) => {
                this.setState({
                  searchTerm: event.target.value,
                });
              }}
            />
            <span className="input-group-btn">
              <button
                className="btn btn-primary btn-lg"
                type="button"
                onClick={this._submitForm}
              >
                Go!
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
