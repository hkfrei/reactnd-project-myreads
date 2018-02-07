import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookSearch from './components/BookSearch'
import BookShelf from './components/BookShelf'
import './App.css'

class BooksApp extends React.Component {

  /* Get the initial Data (async) */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  state = {
    books: []
  }

  /*
    @description change the shelf of a book
    on the server and in the current state
    @param {object} book - The book to change
    @param {string} newShelf - The new shelf to store the book in
  */
  changeBookShelf = (book, newShelf) => {
    /* for better responsiveness, first save in state */
    this.setState({ books: this.getChangedBooks(book, newShelf) })
    /* save to server */
    BooksAPI.update(book, newShelf).then((result) => {
      console.log(result);
    })
    .catch(error => alert('Sorry, changes couldn\'nt be stored on the server.'))
  }

  /*
    @description change the shelf of a book with a
    particular id, in the array of all books.
    If the book is not in the array, add it.
    @param {string} id - The id of the book to change
    @param {string} newShelf - The new Shelf to store the book in
    @return {array} changedBooks - a new array with all the books, including the changed one.
  */
  getChangedBooks = (book, newShelf) => {
    let changedBooks = []
    /* if the book is already in state, change it */
    if (this.bookInState(book.id)) {
      changedBooks = this.state.books.map(element => {
      if (element.id === book.id) {
        element.shelf = newShelf
      }
      return element
    })
    } else {
      /*
        if it's a new book, add the shelf property
        and combine it with current state.books
      */
      book.shelf = newShelf
      changedBooks = this.state.books.concat([book])
    }
    return changedBooks
  }

  /*
    @description check if a book is allready in state
    @param {string} id - The id of the book to check
    @return {number} - >=1 if book is allready in state, 0 otherwise.
  */
  bookInState = (id) => {
    return this.state.books.filter(book => book.id === id).length
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route exact path="/search" render={ () => (
          <BookSearch changeBookShelf={this.changeBookShelf}/>
          )}
        />
          <Route exact path="/" render={ () => (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf books={books.filter(book => book.shelf === 'currentlyReading')} changeBookShelf={this.changeBookShelf} title="Currently Reading"/>
                <BookShelf books={books.filter(book => book.shelf === 'wantToRead')} changeBookShelf={this.changeBookShelf} title="Want to Read"/>
                <BookShelf books={books.filter(book => book.shelf === 'read')} changeBookShelf={this.changeBookShelf} title="Read"/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
            )}
          />
      </div>
    )
  }
}

export default BooksApp
