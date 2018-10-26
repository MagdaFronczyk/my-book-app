import React from "react";

class BookSearchItem extends React.Component {
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
            disable: true,
        });
        this.props.setShelf(shelf, element)
    };

    render() {

        const element = this.props.book;
        const index = this.props.index;

        return (

            <li >
                <div className="search_main_panel_books_bookList_item">
                    <select
                        value={this.state.bookshelf}
                        id="addNewBook"
                        className="search_main_panel_books_bookList_item_button"
                        onChange={event => this.handleSelect(event, element)}>
                        <option>Add:</option>
                        <option disabled={this.state.disable}>Read</option>
                        <option disabled={this.state.disable}>To Read</option>
                    </select>

                    <p className="bestsellers_main_panel_books_bookList_item_title">
                        <i>{element.title}</i></p>
                    <p className="bestsellers_main_panel_books_bookList_item_author">
                        <i>by {element.author}</i></p>
                </div>
            </li>
        )
    }
}

export default BookSearchItem;