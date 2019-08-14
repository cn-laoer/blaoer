import React,{Component} from 'react';
import './index.css';

export default class CssBook extends Component {
    render() {
        return (
            <div className='bmain bookmain'>
                <div className='component'>
                    <ul className='align'>
                        <li>
                            <figure className='book'>
                                <ul className='hardcover_front'>
                                    <li>
                                        <div className='coverDesign blue'>
                                            <h1>CSS</h1>
                                            <p>BOOK</p>
                                        </div>
                                    </li>
                                    <li></li>
                                </ul>
                                <ul className='page'>
                                    <li></li>
                                    <li>
                                        <span className='btn'>bieLaoer</span>
                                    </li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <ul className='hardcover_back'>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <ul className='book_spine'>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </figure>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}