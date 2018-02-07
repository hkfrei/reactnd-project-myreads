import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

function BooksGrid(props) {
  return (
    <div>
      <ol className="books-grid">
        {props.books.length > 0 &&
          props.books.map((book, index) => (
            <Book
              book={book}
              key={index}
              changeBookShelf={props.changeBookShelf}
            />
          ))}
      </ol>

      <div>
        {props.books.length === 0 && (
          <span style={{ display: "flex", justifyContent: "center" }}>
            Please type to search...
          </span>
        )}
      </div>
    </div>
  );
}
BooksGrid.propTypes = {
  books: PropTypes.array.isRequired,
  changeBookShelf: PropTypes.func.isRequired
};
export default BooksGrid;
