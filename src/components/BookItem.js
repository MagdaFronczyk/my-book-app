import React, {Component} from 'react';

class BookItem extends React.Component {
    constructor() {
        super();
        this.state = {
            bookshelf: "",
            disable: null,
        }
    }

    handleSelect = (e, element) => {
        const shelf = e.target.value === "Read" ? "read" : "toRead";
        this.setState({
            bookshelf: shelf,
            disable: true
        });
        this.props.setShelf(shelf, element)
    };


    render() {

        const element = this.props.book;
        const index = this.props.index;
        return (
            <li>
                <div className="bestsellers_main_panel_books_bookList_item_info">
                    <p className="bestsellers_main_panel_books_bookList_rank">#{index + 1}</p>
                    <select
                        value={this.state.bookshelf}
                        id="addNewBook"
                        className="bestsellers_main_panel_books_bookList_item_button"
                        onChange={event => this.handleSelect(event, element)}>
                        <option>Add:</option>
                        <option disabled={this.state.disable}>Read</option>
                        <option disabled={this.state.disable}>To Read</option>
                    </select>

                    <p className="bestsellers_main_panel_books_bookList_item_title">
                        <i>{element.book_details[0].title}</i></p>
                    <p className="bestsellers_main_panel_books_bookList_item_author">
                        <i>by {element.book_details[0].author}</i></p>
                    <p className="bestsellers_main_panel_books_bookList_item_description">{element.book_details[0].description}</p>
                    <p className="bestsellers_main_panel_books_bookList_item_weeks">
                        <i><span>Weeks on list:</span> {element.weeks_on_list}</i></p>
                    <a href={element.amazon_product_url} target="_blank"
                       className="bestsellers_main_panel_books_bookList_item_link">Buy on amazon</a>
                </div>
            </li>

        )
    }
}

export default BookItem;