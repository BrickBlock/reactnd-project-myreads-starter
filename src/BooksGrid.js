import React, {Component} from 'react';
import * as BooksAPI from "./BooksAPI";

class BookGrid extends Component {
    handleChange = (book, e) => {
        const previousShelf = book.shelf;
        book.shelf = e.target.value;
        if(previousShelf === 'none' && previousShelf !== book.shelf){
            this.props.addBookToShelf(book)
        } 
        
        else if(this.props.updateShelf) {
            this.props.updateShelf();
        } 
        
        else if(book.shelfIndex) {
            this.props.refreshBookShelves(book)
        }
        BooksAPI.update(book, e.target.value);
    };

    render() {
        const {showingBooks} = this.props;
        return (
            <ol className="books-grid">
                {showingBooks.length && showingBooks.map((book) => (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{
                                    width: 144,
                                    height: 216,
                                    backgroundImage: `url("${book.imageLinks.thumbnail}")`
                                }}> </div>
                                <div className="book-shelf-changer">
                                    <select value={book.shelf} onChange={(e) => this.handleChange(book, e)}>
                                        <option value="none" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors.map((author) => (`${author}, `))}</div>
                        </div>
                    </li>
                ))}
            </ol>
        );
    }
}

export default BookGrid;