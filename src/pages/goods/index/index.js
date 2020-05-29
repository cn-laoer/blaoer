import React,{Component} from 'react';
import { aget } from '../../../api/ajax';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    componentDidMount() {
        this.getData();
    }
    getData () {
        aget(`${global.serviceUrl}/goods`).then((res) => {
            console.log(res);
            this.setState({
                data: res.msg
            });
        });
    }
    render() {
        return (
            <div className="bmain">
                
            </div>
        )
    }
}