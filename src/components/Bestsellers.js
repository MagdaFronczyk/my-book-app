import React, {Component} from 'react';
import axios from 'axios';
import BookItem from "./BookItem";
import {Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll';
import {db} from "./Firebase";
import BookSearchItem from "./BookSearchItem"

class Bestsellers extends React.Component {
    constructor() {
        super();
        this.state = {
            booksNYT: [],
            booksGoogle: [],
            bookshelf: "",
            read: [],
            toRead: [],
            bookSearched: [],
            booksFiltered: []
        }
    }

    setShelf = (shelf, element) => {

        this.setState({
            [shelf]: [...this.state[shelf], element]
        });

    };

    handleRead = (event, element, index) => {
        const alreadyRead = element;
        const temp = [...this.state.toRead];
        const toRead = temp.splice(index, 1);//usuwamy element z tablicy to read i przekazujemy w state'ie splice zwraca usuniety element
        console.log("toread", toRead);
        this.setState({
            read: [...this.state.read, alreadyRead],
            toRead: temp
        })
    };

    scrollToTop() {
        scroll.scrollToTop();
    }

    scrollTo() {
        scroller.scrollTo('scroll-to-element', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    }

    scrollToWithContainer() {

        let goToContainer = new Promise((resolve, reject) => {

            Events.scrollEvent.register('end', () => {
                resolve();
                Events.scrollEvent.remove('end');
            });

            scroller.scrollTo('scroll-container', {
                duration: 800,
                delay: 0,
                smooth: 'easeInOutQuart'
            });

        });

        goToContainer.then(() =>
            scroller.scrollTo('scroll-container-second-element', {
                duration: 800,
                delay: 0,
                smooth: 'easeInOutQuart',
                containerId: 'scroll-container'
            }));
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    handleChange = (e) => {

        const filtered = this.state.bookSearched.filter((book)=>{
            return book.title.toUpperCase() === e.target.value.toUpperCase() || book.author.toUpperCase() === e.target.value.toUpperCase();
        });

        this.setState({
            searchInput: e.target.value,
            booksFiltered: filtered,
        })
    };


    render() {

        let books = [...this.state.read];
        let newObj = {};
        if(books.length && books[0].from) {
            newObj.book_details = [];
            const p = {
                author :books[0].author ,
                title : books[0].title
            };
            newObj.book_details.push(p);
            books = [newObj]
        }

        const readBooks = books.map((element, index) => {
            console.log(element);
            return (
                <li className="bookcase_shelves_shelf_main_bookList_item" key={index}>
                    <p className="bookcase_shelves_shelf_main_bookList_item_title">
                        <i>{element.book_details[0].title === undefined ? element.title : element.book_details[0].title}</i></p>
                    <p className="bookcase_shelves_shelf_main_bookList_item_author">
                        <i>by {element.book_details[0].author  === undefined ? element.author : element.book_details[0].author}</i></p>
                </li>
            )
        });

        const toReadBooks = this.state.toRead.map((element, index) => {
            return (
                <li className="bookcase_shelves_shelf_main_bookList_item" key={index}>
                    <button className="bookcase_shelves_shelf_main_bookList_button"
                            onClick={event => this.handleRead(event, element, index)}>
                        Read
                    </button>
                    <p className="bookcase_shelves_shelf_main_bookList_item_title">
                        <i>{element.book_details[0].title}</i></p>
                    <p className="bookcase_shelves_shelf_main_bookList_item_author">
                        <i>by {element.book_details[0].author}</i></p>
                </li>
            )
        });

        const NYTbestseller = this.state.booksNYT.map((element, index) => {
            return (
                <BookItem key={index}
                          book={element}
                          index={index}
                          setShelf={this.setShelf}
                />
            )
        });

        const booksSearched = this.state.booksFiltered.map((element,index)=> {
            return (
                <BookSearchItem
                    key={index}
                    book={element}
                    index={index}
                    setShelf={this.setShelf}
                />
            )
        });

        if (this.state.bookSearched.length === 0) {
            return <p>Loading</p>
        }

        return (
            <div>

                <div className="bookcase_panel element" id="bookcase">

                    <section className="bookcase_shelves main-width">
                        <div className="bookcase_shelves_container">

                            <div className="bookcase_shelves_shelf_nav">
                                <h1 className="bookcase_shelves_shelf_nav_heading">Read</h1>
                            </div>

                            <section className="bookcase_shelves_shelf">
                                <div className="bookcase_shelves_shelf_main">
                                    <ul className="bookcase_shelves_shelf_main_bookList">
                                        {readBooks}
                                    </ul>
                                </div>

                            </section>
                        </div>

                        <div className="bookcase_shelves_container">

                            <div className="bookcase_shelves_shelf_nav">
                                <h1 className="bookcase_shelves_shelf_nav_heading">To Read</h1>
                            </div>

                            <section className="bookcase_shelves_shelf">
                                <div className="bookcase_shelves_shelf_main">
                                    <ul className="bookcase_shelves_shelf_main_bookList">
                                        {toReadBooks}
                                    </ul>
                                </div>

                            </section>
                        </div>

                        <div className="bookcase_shelves_buttons">
                            <Link activeClass="active"
                                  to="bestsellers"
                                  spy={true}
                                  smooth={true}
                                  duration={500}>
                                <button className="bookcase_shelves_button">NYT bestsellers</button>
                            </Link>
                            <Link activeClass="active"
                                  to="bookfinder"
                                  spy={true}
                                  smooth={true}
                                  duration={500}>
                                <button className="bookcase_shelves_button">Add a new book</button>
                            </Link>
                        </div>

                    </section>
                </div>

                <div className="bestsellers_panel element" id="bestsellers">
                    <section className="bestsellers main-width ">
                        <div className="bestsellers_container">

                            <div className="bestsellers_nav">
                                <h1 className="bestsellers_nav_heading">New York Times Bestsellers</h1>
                            </div>

                            <section className="bestsellers_main_panel">

                                <section className="bestsellers_main_panel_books">

                                    <ul className="bestsellers_main_panel_books_bookList">
                                        {NYTbestseller}
                                    </ul>
                                </section>

                            </section>
                        </div>

                        <div className="bestsellers_buttons">
                            <Link activeClass="active"
                                  to="bookcase"
                                  spy={true}
                                  smooth={true}
                                  duration={500}>
                                <button className="bestsellers_button_return">Return to shelves</button>
                            </Link>
                        </div>

                    </section>
                </div>

                <div className="bookfinder_panel element" id="bookfinder">
                    <section className="search main-width ">
                        <div className="search_container">

                            <div className="search_main_panel_nav">
                                <h1 className="search_main_panel_nav_heading">Add a new book</h1>
                            </div>

                            <section className="search_main_panel">
                                <label htmlFor="search"> </label>
                                <input
                                    value={this.state.searchInput}
                                    onChange={this.handleChange}
                                    type="search"
                                    className="search_main_panel_input"
                                    id="search"
                                    placeholder="Search by title or author..."/>
                                <section className="search_main_panel_books">
                                    <ul className="search_main_panel_books_bookList">
                                        {booksSearched}
                                    </ul>
                                </section>

                            </section>
                        </div>

                        <div className="search_buttons">
                            <Link activeClass="active"
                                  to="bestsellers"
                                  spy={true}
                                  smooth={true}
                                  duration={500}>
                                <button className="search_button_bestsellers">NYT bestsellers</button>
                            </Link>
                            <Link activeClass="active"
                                  to="bookcase"
                                  spy={true}
                                  smooth={true}
                                  duration={500}>
                                <button className="search_button_return">Return to shelves</button>
                            </Link>
                        </div>

                    </section>
                </div>

            </div>


        )
    }

    componentDidMount() {

        Events.scrollEvent.register('begin', function () {

        });

        Events.scrollEvent.register('end', function () {

        });

        db.collection('my-books').get().then((response) => {
            const temp = [];
            const info = {from: "FB"}
            response.docs.forEach((e) => {
                const newObj = Object.assign({}, e.data(), info)
                temp.push(newObj)
            });
            this.setState({
                bookSearched: temp
            })
        });

        axios.get("https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=442776d99c7e4ee6999d05a6b05c24ca")
            .then((res) => {
                const results = res.data.results;
                this.setState({
                    booksNYT: results
                });
            });
    }
}

export default Bestsellers;
