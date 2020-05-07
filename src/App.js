/* eslint-disable react/jsx-filename-extension */
import React, { Component, createRef } from 'react';
import sortBy from 'sort-by';
import Update from 'immutability-helper';
import Spinner from './Spinner';
import BookList from './BookList';
import BookRow from './BookRow';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      totalBooks: 0,
      searchCompleted: false,
      searching: false,
      sorting: 'asc',
    };

    this.searchInput = createRef();
  }

  _toggleSorting = () => (this.state.sorting === 'asc' ? 'desc' : 'asc');

  _sortByTitle = () => {
    const sortByAttribute = this.state.sorting === 'asc' ? 'title' : '-title';
    const newState = Update(this.state, {
      books: {
        $apply: (books) => books.sort(sortBy(sortByAttribute)),
      },
      sorting: {
        $apply: (sorting) => (sorting === 'asc' ? 'desc' : 'asc'),
      },
    });
    this.setState(newState);
  };

  _displaySearchResults = () => {
    if (this.state.searching) {
      return <Spinner />;
    }
    if (this.state.searchCompleted) {
      return (
        <BookList
          searchCount={this.state.totalBooks}
          _sortByTitle={this._sortByTitle}
        >
          {this._renderBooks()}
        </BookList>
      );
    }
  };

  _renderBooks = () => this.state.books.map((book) => (
    <BookRow
      key={book.edition_key}
      title={book.title}
      author_name={book.author_name}
      edition_count={book.edition_count}
    />
  ));

  _performSearch = () => {
    const searchTerm = this.searchInput.current.value;
    this.setState({
      searchCompleted: false,
      searching: true,
    });
    this._searchOpenLibrary(searchTerm);
  };

  _searchOpenLibrary = (searchTerm) => {
    const openlibraryURI = `https://openlibrary.org/search.json?q=${searchTerm}`;
    this._fetchData(openlibraryURI).then(this._updateState);
  };

  _fetchData = (url) => fetch(url)
    .then(this._parseJSON)
    .catch((ex) => {
      console.log('Parsing failed', ex);
    });

  _parseJSON = (response) => response.json();

  _updateState = (response) => {
    const jsonResponse = response;

    this.setState({
      books: jsonResponse.docs,
      totalBooks: jsonResponse.numFound,
      searchCompleted: true,
      searching: false,
    });
  };

  render() {
    const tabStyles = { paddingTop: '5%' };

    return (
      <div className="container">
        <div className="row" style={tabStyles}>
          <div className="col-lg-8 col-lg-offset-2">
            <h4>
              Open Library | Search any book you want!
            </h4>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search books..."
                ref={this.searchInput}
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-default"
                  type="button"
                  onClick={this._performSearch}
                >
                  Go!
                </button>
              </span>
            </div>
          </div>
        </div>
        {this._displaySearchResults()}
      </div>
    );
  }
}

export default App;
