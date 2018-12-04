import React, {Component} from 'react';
import BooksGrid from './BooksGrid';

class Shelf extends Component {
    updateShelf() {
        this.props.updateShelf(this.props.books)
    }

    render() {
        const {shelf, books} = this.props;
        const showingBooks = (books && books.length) ? books.filter((b) => b.shelf === shelf.apiName) : [];
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.givenName}</h2>
                <div className="bookshelf-books">
                    <BooksGrid
                        showingBooks={showingBooks}
                        updateShelf={(books) => { this.updateShelf(books) }}
                    />
                </div>
            </div>
        );
    }
}

export default Shelf;
