import './App.css';
import { Component } from 'react';
import ELibraryService from '../../repository/eLibraryRepository'
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import Header from '../Header/header'
import BookAdd from '../Books/BookAdd/bookAdd'
import BookEdit from '../Books/BookEdit/bookEdit'
import Books from '../Books/BooksList/books'
import Categories from '../Categories/categories'
import Authors from '../Authors/authors'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      authors: [],
      categories: [],
      countries: [],
      selectedBook: {}
    }
  }

  render() {
    return (
      <Router>
        <Header/>
        <main>
          <div className="container">
            <Route path={"/categories"} exact render={() => <Categories categories={this.state.categories}/>}/>
            <Route path={"/authors"} exact render={() => <Authors authors={this.state.authors}/>}/>
            <Route path={"/books/add"} exact render={() => <BookAdd categories={this.state.categories} 
                                                                          authors={this.state.authors} 
                                                                          onAddBook={this.addBook}/>} />
            <Route path={"/books/edit/:id"} exact render={() => <BookEdit categories={this.state.categories} 
                                                                                authors={this.state.authors} 
                                                                                onEditBook={this.editBook}
                                                                                book={this.state.selectedBook}/>} />
            <Route path={"/books"} exact render={() => <Books books={this.state.books} 
                                                                    onDelete={this.deleteBook}
                                                                    onEdit={this.getBook}
                                                                    markAsTaken={this.markAsTaken}/>}/>
            <Redirect to={"/books"}/>

          </div>
        </main>
      </Router>
    );
  }

  loadBooks = () => {
    ELibraryService.fetchBooks()
      .then((data) => {
        this.setState({
          books: data.data
        })
      })
  }

  loadCategories = () => {
    ELibraryService.fetchCategories()
      .then((data) => {
        this.setState({
          categories: data.data
        })
      })
  }

  loadAuthors = () => {
    ELibraryService.fetchAuthors()
      .then((data) => {
        this.setState({
          authors: data.data
        })
      })
  }

  deleteBook = (id) => {
    ELibraryService.deleteBook(id)
      .then(() => {
        this.loadBooks()
      })
  }

  addBook = (name, category, author, availableCopies) => {
    ELibraryService.addBook(name, category, author, availableCopies)
      .then(() => {
        this.loadBooks()
      })
  }

  editBook = (id, name, category, author, availableCopies) => {
    ELibraryService.editBook(id, name, category, author, availableCopies)
      .then(() => {
        this.loadBooks()
      })
  }

  markAsTaken = (id) => {
    ELibraryService.markAsTaken(id)
      .then(() => {
        this.loadBooks()
      })
  }

  getBook = (id) => {
    ELibraryService.getBook(id)
      .then((data) => {
        this.setState({
          selectedBook: data.data
        })
      })
  }

  componentDidMount() {
    this.loadBooks();
    this.loadCategories();
    this.loadAuthors();
  }

}

export default App;
