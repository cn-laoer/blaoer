import React,{Component} from 'react';
import { List, Card, Button, message } from 'antd';
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
    showDetail(e,id) {
        e.preventDefault();
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
    goEdit(e,id) {
        e.preventDefault();
        e.stopPropagation();
        this.props.history.push({pathname:`/reactEdit/${id}`});
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
                        onClick={(e)=> {this.showDetail(e,item.id)}}
                    >
                        <div className="del">
                            <Button type="primary" shape="circle" icon="edit" onClick={(e)=> this.goEdit(e,item.id)}></Button>                        
                            {item.delete === 1? (
                                <Button
                                    type="danger"
                                    shape="circle"
                                    icon="delete"
                                    onClick={(e) => this.delData(e,item.id)}
                                ></Button>
                            ) : (
                                ''
                            )}
                        </div>
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