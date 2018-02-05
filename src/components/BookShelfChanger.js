import React from 'react'
import PropTypes from 'prop-types'

function BookShelfChanger(props) {
  return(
    <div className="book-shelf-changer">
      <select onChange={ (event) => {props.changeBookShelf(props.book.id, event.target.value)}} value={props.book.shelf || 'none'}>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  )
}

BookShelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
  changeBookShelf: PropTypes.func.isRequired
}
export default BookShelfChanger