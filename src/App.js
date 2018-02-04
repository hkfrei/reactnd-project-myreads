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
      console.log(books)
      this.setState({ books })
    })
  }

  state = {
    books: []
  }

  changeBookShelf = (newValue) => {
    console.log(newValue)
  }

  render() {
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
                <BookShelf books={this.state.books} changeBookShelf={this.changeBookShelf} title="Currently Reading"/>
                <BookShelf books={this.state.books} changeBookShelf={this.changeBookShelf} title="Want to Read"/>
                <BookShelf books={this.state.books} changeBookShelf={this.changeBookShelf} title="Read"/>
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
