/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import BookListHeader from './BookListHeader';
import BookTableHeader from './BookTableHeader';
import RowAlternator from './RowAlternator';
import BookRow from './BookRow';

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: [
        'grey',
        'lightgreen',
        'yellow',
        'lightblue',
        'lightgrey',
      ],
    };
  }

  _selectRandomColor = () => {
    const randomColor = this.state.colors[
      Math.floor(Math.random() * this.state.colors.length)
    ];
    console.log(randomColor);
    return randomColor;
  };

  _renderBooks = () => this.props.books.map((book, idx) => (
    <BookRow
      key={idx}
      index={idx + 1}
      title={book.title}
      author_name={book.author_name}
      edition_count={book.edition_count}
    />
  ));

  render() {
    return (
      <div className="row">
        <div>
          <BookListHeader
            searchCount={this.props.searchCount}
          />
          <table className="table table-stripped">
            <BookTableHeader
              sortByTitle={this.props._sortByTitle}
            />
            <RowAlternator
              firstColor="white"
              secondColor={this._selectRandomColor()}
            >
              {this._renderBooks()}
            </RowAlternator>
          </table>
        </div>
      </div>
    );
  }
}

export default BookList;
