import React, {Component} from 'react';

class Bookcase extends React.Component {
    constructor() {
        super();
            this.state ={
                read:[],
                toRead:[]
            }
    }

    render() {
        return (

            <div className="bookcase_panel">

                <section className="bookcase_shelves main-width">
                    <div className="bookcase_shelves_container">

                        <div className="bookcase_shelves_shelf_nav">
                            <h1 className="bookcase_shelves_shelf_nav_heading">Read</h1>
                        </div>

                        <section className="bookcase_shelves_shelf">
                            <div className="bookcase_shelves_shelf_main">
                                <ul className="bookcase_shelves_shelf_main_bookList">
                                    <li className="bookcase_shelves_shelf_main_bookList_item">
                                    </li>
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
                                    <li className="bookcase_shelves_shelf_main_bookList_item">
                                        <button className="bookcase_shelves_shelf_main_bookList_button">Read</button>
                                    </li>
                                </ul>
                            </div>

                        </section>
                    </div>

                    <div className="bookcase_shelves_buttons">
                        <button className="bookcase_shelves_button">Add a new book</button>
                    </div>

                </section>
            </div>


        )
    }

    componentDidMount() {

    }
}

export default Bookcase;