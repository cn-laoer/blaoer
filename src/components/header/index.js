import React,{Component} from 'react';
import {Avatar, Dropdown, Menu} from 'antd';
import './index.scss';

const menu = (
    <Menu>
        <Menu.Item>我的</Menu.Item>
        <Menu.Item>退出登录</Menu.Item>
    </Menu>
);
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