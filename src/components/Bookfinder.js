import React, {Component} from 'react';

class Bookfinder extends React.Component {
    constructor() {
        super();

    }

    render() {
        return (

            <div className="bookfinder_panel">
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
                                        <label htmlFor="addNewBook"></label>
                                        <select id="addNewBook"
                                                className="search_main_panel_books_bookList_item_button">
                                            <option>Read</option>
                                            <option>To Read</option>
                                        </select>
                                        <figure className="search_main_panel_books_bookList_img"></figure>
                                    </li>
                                </ul>
                            </section>

                        </section>
                    </div>

                    <div className="search_buttons">
                        <button className="search_button_return">Return to shelves</button>
                        <button className="search_button_bestsellers">NYT bestsellers</button>
                    </div>

                </section>
            </div>


        )
    }
}

export default Bookfinder;