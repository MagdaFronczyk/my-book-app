import React from "react";

class BookSearchItem extends React.Component {
    constructor() {
        super();
        this.state = {
            bookshelf: ""
        }
    }

    handleSelect = (e, element) => {
        const shelf = e.target.value === "Read" ? "read" : "toRead";
        this.setState({
            bookshelf: shelf,
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
                        <option>Read</option>
                        <option>To Read</option>
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