import React,{Component} from 'react';
import {Timeline, Icon } from 'antd';
import './index.scss';

export default class About extends Component {
    render() {
        return (
            <div className="bmain">
                <br/>
                <br/>
                <Timeline mode="alternate" pending="Recording...">
                    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>Create a site in 2019-07-16</Timeline.Item>
                    <Timeline.Item color="green">Update site in 2019-07-19</Timeline.Item>
                    <Timeline.Item>More than...</Timeline.Item>
                </Timeline>
            </div>
        )
    }
}