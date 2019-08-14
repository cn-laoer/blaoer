import React,{Component} from 'react';
import {List, Alert, Avatar} from 'antd';
import axios from 'axios';
import '../../api/service';

export default class getAxios extends Component {
    constructor(props) {
        super(props);
        this.state = {
          posts: [],
          alertMessage: '',
          alertType: ''
        };
    }
    componentDidMount() {
        this.getData()
    }
    getData () {
        axios.get(`${global.serviceUrl}/newss`)
        .then(res => {
            if (res.status===200) {
            console.log(res.data.msg);
                this.setState({
                    alertMessage: 'success',
                    alertType: 'warning'
                });
                setTimeout(()=>{
                    this.setState({
                        alertMessage: '',
                        alertType: ''
                    });
                },2000)
                // const datas = res.data.msg.map(obj => obj.data);
                this.setState({ posts: res.data.msg });
            } else {
                this.setState({
                    alertMessage: 'this result has err',
                    alertType: 'error'
                });
                setTimeout(()=>{
                    this.setState({
                        alertMessage: '',
                        alertType: ''
                    });
                },2000)
            }
        });
    }
    render() {
        const listItem = this.state.posts.map((item, index)=> {
            return (
                <List.Item key={index}>
                    <List.Item.Meta
                    // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    avatar={<Avatar src={item.avator_url} />}
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={item.url}
                    />
                </List.Item>
            )
        })
        return (
            <div className="bmain">
                <List
                itemLayout="horizontal">
                    {
                        listItem
                    }
                </List>
                {this.state.alertMessage!==''?<Alert message={this.state.alertMessage} type={this.state.alertType} />:''}
            </div>
        )
    }
}