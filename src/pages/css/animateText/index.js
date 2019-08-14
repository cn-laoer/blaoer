import React,{Component} from 'react';
import './index.css';

export default class CssAnimateText extends Component {
    render() {
        return (
            <div className="bmain animateMain">
                <div className="content">
                    <div className="content__container">
                        <p className="content__container__text">
                            Hello
                        </p>
                        <ul className="content__container__list">
                            <li className="content__container__list__item">world !</li>
                            <li className="content__container__list__item">Laoer !</li>
                            <li className="content__container__list__item">users !</li>
                            <li className="content__container__list__item">everybody !</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}