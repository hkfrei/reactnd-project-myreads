import React from "react";
import PropTypes from "prop-types";
import BooksGrid from "./BooksGrid";

function BookShelf(props) {
  const { title, books, changeBookShelf } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <BooksGrid books={books} changeBookShelf={changeBookShelf} />
      </div>
    </div>
  );
}
BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  changeBookShelf: PropTypes.func.isRequired
};
export default BookShelf;
