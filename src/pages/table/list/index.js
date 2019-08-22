import React,{Component} from 'react';
import { Alert, Table, Avatar, Button, message } from 'antd';
import axios from 'axios';
import '../../../api/service';
import moment from 'moment';

const qs= require('qs');

export default class getAxios extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          alertMessage: '',
          alertType: '',
          column: [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                render:  (text,recode,index) => <span>{recode.id}</span>
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'avatorUrl',
                dataIndex: 'avator_url',
                key: 'avator_url',
                render: (text,recorder,index) => <Avatar src={recorder.avator_url} />
            },
            {
                title: 'createTime',
                dataIndex: 'create_time',
                key: 'create_time',
                render:  (text,recode,index) => <span>{moment(recode.create_time).format('YYYY-MM-DD hh:mm:ss a')}</span>
            },
            {
                title: 'updateTime',
                dataIndex: 'update_time',
                key: 'update_time',
                render:  (text,recode,index) => <span>{moment(recode.update_time).format('YYYY-MM-DD hh:mm:ss a')}</span>
            },
            {
                title: 'operation',
                dataIndex: '',
                key: 'operation',
                render: (text,recorder,index) => {
                    return recorder.status===1?
                    (
                        <div>
                            <Button type="link" onClick={() => this.downData(recorder)}>Down</Button>
                            <Button type="link" onClick={() => this.delData(recorder.id)}>Delete</Button>
                        </div>
                    )
                    :
                    (
                        <div>
                            <Button type="link" onClick={() => this.upData(recorder)}>Up</Button>
                            <Button type="link" onClick={() => this.delData(recorder.id)}>Delete</Button>
                        </div>
                    )
                }
            }
          ]
        };
    }
    componentDidMount() {
        this.getData();
    }
    getData() {
        axios.get(`${global.serviceUrl}/newss`)
        .then(res => {
            if (res.status===200) {
            // console.log(res.data.msg);
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
                let datas = res.data.msg;
                for (let i=0;i<datas.length;i++) {
                  datas[i].key = i;
                }
                this.setState({ data: datas });
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
    downData (data) {
        let obj = {
            status: 2,
            id: data.id
        }
        let qsData = qs.stringify(obj);
        axios.get(`${global.serviceUrl}/update/news?${qsData}`)
        .then(res => {
            message.info('this data is down');
            this.getData();
        })
    }
    upData (data) {
        let obj = {
            status: 1,
            id: data.id
        }
        let qsData = qs.stringify(obj);
        axios.get(`${global.serviceUrl}/update/news?${qsData}`)
        .then(res => {
            message.info('this data is up');
            this.getData();
        })
    }
    delData (data) {
        let id = Number(data);
        axios.get(`${global.serviceUrl}/del/news?id=${id}`)
        .then(res => {
            message.info('this data is delete');
            this.getData();
        })
    }
    render() {
        return (
            <div className="bmain">
                <Table dataSource={this.state.data} columns={this.state.column} />
                {this.state.alertMessage!==''?<Alert message={this.state.alertMessage} type={this.state.alertType} />:''}
            </div>
        )
    }
}