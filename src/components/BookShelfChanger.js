import React from "react";
import PropTypes from "prop-types";

function BookShelfChanger(props) {
  const { book, changeBookShelf } = props;
  return (
    <div className="book-shelf-changer">
      <select
        onChange={event => {
          changeBookShelf(book, event.target.value);
        }}
        value={book.shelf || "none"}
      >
        <option value="none" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}

BookShelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
  changeBookShelf: PropTypes.func.isRequired
};
export default BookShelfChanger;
