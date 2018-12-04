import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './App.css';
import Shelf from './Shelf.js';

class ListShelves extends Component {

    state = {
        shelves: [
            {givenName: 'Currently Reading', apiName: 'currentlyReading'},
            {givenName: 'Want to Read', apiName: 'wantToRead'},
            {givenName: 'Read', apiName: 'read'}]
    };

    render() {
        const {shelves} = this.state;
        const {books, updateShelf} = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map((shelf) => (
                                <Shelf key={shelf.apiName}
                                    shelf={shelf}
                                    books={books}
                                    updateShelf={(books) => updateShelf(books)}/>
                            )
                        )}
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to="/search"
                    >Add a book
                    </Link>
                </div>
            </div>
        );
    }
}

export default ListShelves;