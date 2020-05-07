import React from 'react';
import RowAlternator from './RowAlternator';

export default function BookList(props) {
  return (
    <div className="row">
      <div className="col-lg-8 col-lg-offset-2">
        <span className="text-center">
          Total Results: {props.searchCount}
        </span>
        <table className="table table-stripped">
          <thead>
            <tr>
              <th>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" onClick={props._sortByTitle}>
                  Title
                </a>
              </th>
              <th>Author</th>
              <th>No. of Editions</th>
            </tr>
          </thead>
          <RowAlternator
            firstColor="white"
            secondColor="lightgrey"
          >
            {props.children}
          </RowAlternator>
        </table>
      </div>
    </div>
  );
}
