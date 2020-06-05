import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { Menu, Icon } from 'antd';
import {routes} from '../../router/router';

const { SubMenu } = Menu;
let nowIndex = [];
export default class Sider extends Component {
    componentWillMount(){
        for (let i=0;i<routes.length;i++) {
            // if ('/'+window.location.pathname.split('/')[1]!==routes[i].path) {
            //     nowIndex = [];
            // } else {
            //     nowIndex = [];
            //     nowIndex.push(String(i+1));                
            // }
            if ('/'+window.location.pathname.split('/')[1]===routes[i].path) {
                nowIndex = [];
                nowIndex.push(String(i+1));
            }
        }
    }
  render() {
    return (
        <Menu theme="light" defaultSelectedKeys={nowIndex} mode="inline">
            <Menu.Item key="1">
                <Link to="/">
                    <Icon type="home" />
                    <span>home</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/urls">
                    <Icon type="link" />
                    <span>url use emoji</span>
                </Link>
            </Menu.Item>
            <SubMenu
                key="sub1"
                title={
                <span>
                    <Icon type="user" />
                    <span>web security</span>
                </span>
                }
            >
                <Menu.Item key="3">
                    <Link to="/webSecurity">desc</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/webSecurityFont">webFont</Link>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="5">
                <Link to="/about">
                    <Icon type="smile" />
                    <span>about</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="6">
                <Link to="/echarts">
                    <Icon type="area-chart" />
                    <span>echarts</span>
                </Link>
            </Menu.Item>
            <SubMenu
                key="sub2"
                title={
                <span>
                    <Icon type="like" />
                    <span>css</span>
                </span>
                }
            >
                <Menu.Item key="7">
                    <Link to="/cssLoading">
                        <Icon type="loading" />
                        <span>loading</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="8">
                    <Link to="/cssBook">
                        <Icon type="book" />
                        <span>book</span>
                    </Link>
                </Menu.Item>
                <SubMenu
                    key="sub3"
                    title={
                    <span>
                        <Icon type="font-colors" />
                        <span>css font</span>
                    </span>
                    }
                >
                    <Menu.Item key="9">
                        <Link to="/cssShadowText">
                            <span>shadow text</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="10">
                        <Link to="/cssAnimateText">
                            <span>animate text</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="11">
                        <Link to="/cssGradientText">
                            <span>gradient text</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
            </SubMenu>
            <Menu.Item key="12">
                <Link to="/getAxios">
                    <Icon type="retweet" />
                    <span>get axios</span>
                </Link>
            </Menu.Item>
            <SubMenu
                    key="sub4"
                    title={
                    <span>
                        <Icon type="table" />
                        <span>table</span>
                    </span>
                    }
                >
                <Menu.Item key="13">
                    <Link to="/table">
                        {/* <Icon type="retweet" /> */}
                        <span>table</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="14">
                    <Link to="/editTable">
                        {/* <Icon type="retweet" /> */}
                        <span>edit table</span>
                    </Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub5"
                title={
                <span>
                    <Icon type="heat-map" />
                    <span>react</span>
                </span>
                }
            >
                <Menu.Item key="15">
                    <Link to="/react">
                        <span>list</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="16">
                    <Link to="/reactAdd">
                        <span>add</span>
                    </Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub6"
                title={
                <span>
                    <Icon type="gift" />
                    <span>goods</span>
                </span>
                }
            >
                <Menu.Item key="17">
                    <Link to="/goods">
                        <span>list</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="18">
                    <Link to="/goodsAdd">
                        <span>add</span>
                    </Link>
                </Menu.Item>
            </SubMenu>
        </Menu>
    )
  }
}