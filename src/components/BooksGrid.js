import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

function BooksGrid(props) {
  const { books, changeBookShelf } = props;
  return (
    <div>
      <ol className="books-grid">
        {books.length > 0 &&
          books.map((book, index) => (
            <Book book={book} key={index} changeBookShelf={changeBookShelf} />
          ))}
      </ol>
    </div>
  );
}
BooksGrid.propTypes = {
  books: PropTypes.array.isRequired,
  changeBookShelf: PropTypes.func.isRequired
};
export default BooksGrid;
