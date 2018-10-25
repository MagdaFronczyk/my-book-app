import React, {Component} from 'react';

class BookItem extends React.Component {
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

   render(){
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
                     <option>Read</option>
                     <option>To Read</option>
                 </select>

                 <p className="bestsellers_main_panel_books_bookList_item_title">
                     <i>{element.book_details[0].title}</i></p>
                 <p className="bestsellers_main_panel_books_bookList_item_author">
                     <i>by {element.book_details[0].author}</i></p>
                 <p className="bestsellers_main_panel_books_bookList_item_description">{element.book_details[0].description}</p>
             </div>
         </li>

     )
   }
 }
 export default  BookItem;