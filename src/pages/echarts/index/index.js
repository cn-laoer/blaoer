import React,{Component} from 'react';
import { Menu, Layout } from 'antd';
import {Link, Route} from 'react-router-dom';
import {routes} from '../router/router';

let nowIndex = '1';
export default class EchartsBox extends Component {
    componentWillMount (){
        this.reloadMenu();
    };  
    reloadMenu(){
        for (let i=0;i<routes.length;i++) {
            if (window.location.pathname===this.props.match.path+routes[i].path) {
                nowIndex = String(i+1);
            }
        }
    };
    handleClick = e => {
        nowIndex = e.key;
    };
    render() {
        const match = this.props.match.path;
        return (
            <div className="bmain">
                <Menu onClick={this.handleClick} selectedKeys={[nowIndex]} mode="horizontal">
                    {
                        routes.map((item, index)=>{
                            return (
                                <Menu.Item key={String(index + 1)}>
                                    <Link to={`${match}`+item.path}>{item.name}</Link>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
                <Layout>
                    {
                        routes.map((item, index)=>{
                            return (
                                <Route key={index} exact path={`${match}`+item.path} component={item.component}/>
                            )
                        })
                    }
                </Layout>
            </div>
        )
    }
}