import React from 'react'
import { Link }  from 'react-router-dom'
import * as BooksAPI from './../BooksAPI'
import BooksGrid from './BooksGrid'
class BookSearch extends React.Component {

  state = {
    searchResults: []
  }

  /*
    @description search the BooksAPI and update
    the state with the results.
    @param {string} query - the term to search for
  */
  search = (query) => {
    query = query.trim()
    if (query.length === 0) {
      this.setState({ searchResults: [] })
      return
    }
    BooksAPI.search(query).then((response) => {
      this.setState({ searchResults: response })
    })
  }

  render() {
     /* Object destructuring for cleaner code */
    const { searchResults } = this.state
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={ (event) => {this.search(event.target.value)} }
              />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid books={searchResults}/>
        </div>
      </div>
      )
  }
}
export default BookSearch