import React,{Component} from 'react';
import { Button, Icon} from 'antd';
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
        aget(`${global.serviceUrl}/react/detail`,{id: Number(this.props.match.params.id)}).then((res) => {
            console.log(res);
            let resData = res;
            if (resData.code === 0) {
                this.setState({
                    data: resData.data
                });
            }
        });
    }
    goBack() {
        this.props.history.push({pathname:`/react`});
    }
    render (){
        return (
            <div className="bmain" >
                <Button type="primary" 
                    onClick={()=>{this.goBack()}}>
                    <Icon type="left" />
                    Go back
                </Button>
                <h1 className="title">{this.state.data.title}</h1>
                <p>{this.state.data.description}</p>
                <div className="reDetail" dangerouslySetInnerHTML={{__html: this.state.data.content}}></div>
            </div>
        )
    }
}
