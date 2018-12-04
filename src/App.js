import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import ListShelves from './ListShelves';
import Search from './Search';
import * as BooksAPI from "./BooksAPI";


class BooksApp extends Component {
    state = {
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            if(books.length){
                books = books.filter((book) => (book.imageLinks && book.imageLinks.thumbnail && book.title && book.authors && book.authors.length));
                this.setState({books})
            }
        });
    }

    updateShelf(books) {
        this.setState({books})
    }

    addBookToShelf(book) {
        if(this.state.books.indexOf(book) === -1){
            this.setState({books: this.state.books.concat(book)});
        }
        
        else {
            this.updateShelf()
        }
    }

    render() {
        let {books} = this.state;
        return (
            <div className="app">
                <Route path="/search" render={() => (
                    <Search
                        books={books}
                        addBookToShelf={book => this.addBookToShelf(book)}
                        updateShelf={(books) => this.updateShelf(books)}
                    />
                )}/>
                <Route exact path="/" render={() => (
                    <ListShelves
                        books={books}
                        updateShelf={(books) => this.updateShelf(books)}
                    />
                )}/>
            </div>
        );
    }
}

export default BooksApp;
