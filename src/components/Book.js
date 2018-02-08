import React from "react";
import PropTypes from "prop-types";
import BookShelfChanger from "./BookShelfChanger";

function Book(props) {
  /* object destructuring for cleaner code */
  const { book, changeBookShelf } = props;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.smallThumbnail})`
            }}
          />
          <BookShelfChanger book={book} changeBookShelf={changeBookShelf} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  changeBookShelf: PropTypes.func.isRequired
};
export default Book;
