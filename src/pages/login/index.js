import React,{Component} from 'react';
import './index.scss';
import loginBg from '../../assets/images/login_bg.jpg';

export default class Login extends Component {
    render() {
        return (
            <div className="background">
                <div className="login">
                </div>
                <img src={loginBg} alt="bg" className="dot"/>
            </div>
        )
    }
}