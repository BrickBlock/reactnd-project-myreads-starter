import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BooksGrid from './BooksGrid';

class Search extends Component {
    state = {
        query: '',
        books: []
    };

    refreshBookShelves(book) {
        let books = this.props.books;
        books.splice(book.shelfIndex, 1, book);
        this.props.updateShelf(books)
    }

    updateQuery(e) {
        // const self = this;
        if (e) {
            BooksAPI.search(e).then((books) => {
                if(books.length) {
                    books = books.filter((book) => (book.imageLinks && book.title && book.authors));
                    for(let book of books) {
                        const index = this.props.books.findIndex((b) => b.id === book.id);
                        if(index >= 0){
                            book.shelf = this.props.books[index].shelf;
                            book.shelfIndex = index
                        } else {
                            book.shelf = 'none'
                        }
                    }
                    this.setState({books})
                }
            });
        } else {
            this.setState({books: []})
        }
    }

    render() {
        const {books} = this.state;
        const {addBookToShelf} = this.props;
        // if(this.props.books.length > 0 && this.state.books.length === 0){
        //     this.setState({books: this.props.books})
        // }
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        <BooksGrid
                            showingBooks={books}
                            addBookToShelf={(book)=> addBookToShelf(book)}
                            refreshBookShelves={(book) => this.refreshBookShelves(book)}
                        />
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;