import React,{Component} from 'react';
import { List, Card, Button } from 'antd';
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
                        <Button className="del">del</Button>
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