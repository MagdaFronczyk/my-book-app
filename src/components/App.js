import React, {Component} from 'react';
import "../scss/main.scss"
import Bestsellers from './Bestsellers'
import Bookfinder from "./Bookfinder"
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

class App extends React.Component {

    render() {
        return (

            <div>
                <Bestsellers/>
                {/*<Bookfinder/>*/}
            </div>

        )
    }

}

export default App;
