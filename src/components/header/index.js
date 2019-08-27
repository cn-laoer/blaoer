import React,{Component} from 'react';
import {Avatar, Dropdown, Menu} from 'antd';
import {isLogin} from '../../util/index';
import History from '../../api/history';
import './index.scss';

const menu = (
    <Menu>
        <Menu.Item>我的</Menu.Item>
        <Menu.Item onClick={loginOut}>退出登录</Menu.Item>
    </Menu>
);
function loginOut(){
    isLogin.loginout();
    History.replace('/login');
}
export default class Home extends Component {
    render() {
        return (
            <div className="bheader">
                <Dropdown overlay={menu}>
                    <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </Dropdown>
            </div>
        )
    }
}