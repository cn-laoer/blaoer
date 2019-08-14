import React,{Component} from 'react';
import {Layout, Icon, BackTop} from 'antd';
import SiderNav from '../../components/nav/index';
import {BrowserRouter as Router} from 'react-router-dom';
import ContentMain from '../../components/main/index';
import Bheader from '../../components/header/index';
// import Logo from '../../assets/images/logo.png';
// import Login from '../login'
import './index.scss';
const { Header, Footer, Sider, Content } = Layout;

export default class Index extends Component {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <Layout>
                <Router>
                    <Sider trigger={null} theme="light" collapsible collapsed={this.state.collapsed}>
                        <div className="navLogo">
                            {/* <img src={Logo} alt="logo" /> */}
                            {this.state.collapsed ? 'Laoer' : 'bLaoer'}
                        </div>
                        <SiderNav></SiderNav>
                    </Sider>    
                    <Layout>
                        <Header style={{background:"#ffffff"}}>
                                <Icon   
                                    className="trigger"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                                <Bheader></Bheader>
                        </Header>
                        <Content style={{ margin: '24px 16px' }}>
                            <ContentMain></ContentMain>
                        </Content>
                        <Footer style={{ textAlign: 'center', background: '#ffffff'}}> System ©2019 Created by bLaoer</Footer>      
                    </Layout>
                    <BackTop>
                        <Icon type="vertical-align-top" className="ant-back-top-inner" />
                    </BackTop>
                </Router>
            </Layout>
        )
    }
}