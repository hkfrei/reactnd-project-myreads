import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "./../BooksAPI";
import BooksGrid from "./BooksGrid";
class BookSearch extends React.Component {
  state = {
    searchResults: []
  };

  /*
    @description search the BooksAPI and update
    the state with the results.
    @param {string} query - the term to search for
  */
  search = query => {
    query = query.trim();
    if (query.length === 0) {
      this.setState({ searchResults: [] });
      return;
    }
    BooksAPI.search(query).then(response => {
      if (Array.isArray(response)) {
        this.setState({ searchResults: this.replaceShelfedBooks(response) });
      }
    });
  };

  /*
    @description If a book from the searchresults is
    allready in a shelf, replace it with the one from the shelf.
    This makes sure, we can display the correct shelf in the bookShelfChanger.
  */
  replaceShelfedBooks = searchResults => {
    const { bookInState, shelfedBooks } = this.props;
    return searchResults.map((searchResult, index) => {
      if (bookInState(searchResult.id)) {
        const bookFromState = shelfedBooks.filter(
          book => book.id === searchResult.id
        );
        searchResult = bookFromState[0];
      }
      return searchResult;
    });
  };

  render() {
    /* Object destructuring for cleaner code */
    const { searchResults } = this.state;
    const { changeBookShelf } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => {
                this.search(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid books={searchResults} changeBookShelf={changeBookShelf} />
        </div>
      </div>
    );
  }
}
BookSearch.propTypes = {
  shelfedBooks: PropTypes.array.isRequired,
  changeBookShelf: PropTypes.func.isRequired,
  bookInState: PropTypes.func.isRequired
};
export default BookSearch;
