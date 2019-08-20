import React,{Component} from 'react';
import { List, Card, Button, message, Popconfirm } from 'antd';
import { aget } from '../../../api/ajax';
import './index.scss';

export default class ReList extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    componentDidMount() {
        this.getData();
    }
    getData () {
        aget(`${global.serviceUrl}/react`).then((res) => {
            console.log(res);
            this.setState({
                data: res.msg
            });
        });
    }
    showDetail(id) {
        this.props.history.push({pathname:`/reactDetail/${id}`});
    }
    delData(e,id) {
        e.preventDefault();
        e.stopPropagation();
        aget(`${global.serviceUrl}/react/del`,{id: Number(id)}).then((res) => {
            console.log(res);
            message.success('删除成功！');
            this.getData();
        });
    }
    render (){
        return (
            <div className="bmain">
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={this.state.data}
                    renderItem={item => (
                    <List.Item
                        className="cursor"
                        onClick={()=> {this.showDetail(item.id)}}
                    >
                        <Popconfirm 
                            title="确定删除?"
                            onConfirm={(e) => this.delData(e,item.id)}
                            okText="确定"
                            cancelText="取消"
                            >
                            <Button
                                type="danger"
                                className="del"
                                shape="circle"
                                icon="delete"
                            ></Button>
                        </Popconfirm>
                        <Card title={item.title}>
                            {item.description}
                        </Card>
                    </List.Item>
                    )}
                />
            </div>
        )
    }
}