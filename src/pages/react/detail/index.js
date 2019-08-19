import React,{Component} from 'react';
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
            let resData = res.data[0];
            this.setState({
                data: resData
            });
        });
    }
    render (){
        return (
            <div className="bmain" >
                <p>{this.state.data.description}</p>
                <div className="reDetail" dangerouslySetInnerHTML={{__html: this.state.data.content}}></div>
            </div>
        )
    }
}
