import React, {Component} from 'react';
import axios from 'axios';
import BookItem from "./BookItem";
import {Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll';
import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyA9ZXFxzvGzcUGnqY5oLQCUwutGiXu-KmI",
    authDomain: "bookcase-app-220211.firebaseapp.com",
    databaseURL: "https://bookcase-app-220211.firebaseio.com",
    projectId: "bookcase-app-220211",
    storageBucket: "bookcase-app-220211.appspot.com",
    messagingSenderId: "382956583606"
};
firebase.initializeApp(config);


class Bestsellers extends React.Component {
    constructor() {
        super();
        this.state = {
            booksNYT: [],
            booksGoogle: [],
            bookshelf: "",
            read: [],
            toRead: []
        }
    }

    setShelf = (shelf, element) => {

        this.setState({
            // bookshelf: shelf,
            [shelf]: [...this.state[shelf], element]
        });

    };

    handleRead = (event, element, index) => {
        const alreadyRead = element;
        const temp = [...this.state.toRead];
        const toRead = temp.splice(index, 1);//usuwamy element z tablicy to read i przekazujemy w state'ie splice zwraca usuniety element
        console.log("toread", toRead);
        // console.log(index);
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

    render() {

        // if (!this.state.booksGoogle) {
        //     return <p>Loading ...</p>
        // }
        console.log("state", this.state);

        const readBooks = this.state.read.map((element, index) => {
            return (
                <li className="bookcase_shelves_shelf_main_bookList_item" key={index}>
                    <p className="bookcase_shelves_shelf_main_bookList_item_title">
                        <i>{element.book_details[0].title}</i></p>
                    <p className="bookcase_shelves_shelf_main_bookList_item_author">
                        <i>by {element.book_details[0].author}</i></p>
                </li>
            )
        });

        const toReadBooks = this.state.toRead.map((element, index) => {
            console.log(element);
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
// console.log("this.state.booksGoogle",this.state.booksGoogle)
//         const bestseller = <li> </li>
        // this.state.booksGoogle.length > 0 && this.state.booksGoogle.map((element, index) => {
        //     // const thumb = element.items[0];//.volumeInfo.imageLinks.thumbnail
        //     // console.log(thumb)
        //     return (
        //         <li key={index}>
        //             <p className="bestsellers_main_panel_books_bookList_rank">#{index+1}</p>
        //             <div className="bestsellers_main_panel_books_bookList_item">
        //                 <select id="addNewBook" className="bestsellers_main_panel_books_bookList_item_button">
        //                     <option>Add:</option>
        //                     <option>Read</option>
        //                     <option>To Read</option>
        //                 </select>
        //                 <img src={"/"} className="bestsellers_main_panel_books_bookList_item_image" alt=""/>
        //             </div>
        //             <div className="bestsellers_main_panel_books_bookList_item_info">
        //                 <p className="bestsellers_main_panel_books_bookList_item_title">{element.items[0].volumeInfo.title}</p>
        //                 <p className="bestsellers_main_panel_books_bookList_item_author"><i>{element.items[0].volumeInfo.authors}</i></p>
        //             </div>
        //         </li>
        //     )
        // });


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
                                        {/*{bestseller}*/}
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
                                <input type="search"
                                       className="search_main_panel_input"
                                       id="search"
                                       placeholder="Search by title or author..."/>
                                <section className="search_main_panel_books">
                                    <ul className="search_main_panel_books_bookList">
                                        <li className="search_main_panel_books_bookList_item">
                                            <select id="addNewBook"
                                                    className="search_main_panel_books_bookList_item_button">
                                                <option>Read</option>
                                                <option>To Read</option>
                                            </select>
                                        </li>
                                    </ul>
                                </section>

                            </section>
                        </div>

                        <div className="search_buttons">
                            <Link activeClass="active"
                                  to="bookcase"
                                  spy={true}
                                  smooth={true}
                                  duration={500}>
                                <button className="search_button_return">Return to shelves</button>
                            </Link>
                            <Link activeClass="active"
                                  to="bestsellers"
                                  spy={true}
                                  smooth={true}
                                  duration={500}>
                                <button className="search_button_bestsellers">NYT bestsellers</button>
                            </Link>
                        </div>

                    </section>
                </div>

            </div>


        )
    }

    componentDidMount() {

        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });


        // Promise.all([
        //     axios.get('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=442776d99c7e4ee6999d05a6b05c24ca'),
        //     axios.get('https://api.github.com/users/antranilan/repos')
        // ]).then( nyts => {
        //
        // })

        axios.get("https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=442776d99c7e4ee6999d05a6b05c24ca")
            .then((res) => {
                const results = res.data.results;
                this.setState({
                    booksNYT: results
                });

                // results.forEach((element, index) => {
                //     axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${element.isbns[0].isbn10}&key=AIzaSyCXC2B6MQJvgpOCHgopJ60byPdf1-kFQnI`)
                //         .then((response) => {
                //             this.setState({
                //                 booksGoogle: [...this.state.booksGoogle, response.data]
                //             })
                //         })
                // });

            });


    }
}

export default Bestsellers;
