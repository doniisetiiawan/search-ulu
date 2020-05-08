/* eslint-disable react/jsx-filename-extension,react/no-access-state-in-setstate */
import React, { Component } from 'react';
import sortBy from 'sort-by';
import Update from 'immutability-helper';
import Immutable from 'immutable';
import Spinner from './Spinner';
import BookList from './BookList';
import Header from './Header';
import Form from './Form';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      totalBooks: 0,
      offset: 100,
      searching: false,
      sorting: 'asc',
      page: 1,
      searchTerm: '',
      totalPages: 1,
    };
  }

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

  _performSearch = (searchTerm) => {
    console.log(searchTerm);
    this.setState({ searching: true, searchTerm });
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

  _searchAgain = () => {
    if (this.state.page > this.state.totalPages) {
      this.setState({ searching: false });
    } else {
      this._searchOpenLibrary(this.state.searchTerm);
    }
  };

  _updateState = (response) => {
    const jsonResponse = response;
    const newBooks = this.state.books.concat(
      jsonResponse.docs,
    );
    const totalPages = jsonResponse.numFound / this.state.offset + 1;
    const nextPage = this.state.page + 1;

    this.setState(
      {
        books: newBooks,
        totalBooks: jsonResponse.numFound,
        page: nextPage,
        totalPages,
      },
      this._searchAgain,
    );
  };

  render() {
    const style = Immutable.Map({ paddingTop: '5%' });

    return (
      <div className="container">
        <Header style={style} />
        <Form
          style={style}
          performSearch={this._performSearch}
        />

        {this.state.totalBooks > 0
          ? (
            <BookList
              searchCount={this.state.totalBooks}
              _sortByTitle={this._sortByTitle}
              books={this.state.books}
            />
          )
          : null }

        { this.state.searching ? <Spinner /> : null }
      </div>
    );
  }
}

export default App;
