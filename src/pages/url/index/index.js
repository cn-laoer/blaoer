import React,{Component} from 'react';
// import {Button} from 'antd';
import {Typography, Divider, Button, Tooltip} from 'antd';
import './index.scss';
import useImg from '../../../assets/images/url_use_img.png';

const {Title, Paragraph} = Typography;
const iconArr = ['🌑', '🌒', '🌓', '🌔', '🌝', '🌖', '🌗', '🌘'];
const iconArr1 = [
    '😠',
    '😩',
    '😲',
    '😞',
    '😵',
    '😰',
    '😒',
    '😍',
    '😤',
    '😜',
    '😋',
    '😘',
    '😳',
    '😂',
    '☺',
    '😭',
    '😨',
    '😡',
    '😉',
    '😏'
];
let time,time1;
export default class Home extends Component {
    componentWillUnmount(){ // 这里销毁后清除掉计时器
        this.stop();
    }
    stop = () => {
        clearTimeout(time);
        clearTimeout(time1);
    }
    showUrl = () => {
        let that = this;
        window.location.hash = decodeURI(iconArr[Math.floor((Date.now()/100)%iconArr.length)]);
        clearTimeout(time1);
        time = setTimeout(()=>{
            that.showUrl();
        },50);
    }
    showUrl1 = () => {
        let that = this;
        window.location.hash = decodeURI(iconArr1[Math.floor((Date.now()/100)%iconArr1.length)]);
        clearTimeout(time);
        time1 = setTimeout(()=>{
            that.showUrl1();
        },50);
    }
    render() {
        return (
            <div className="bmain">
                <Typography>
                    <Title level={2}>How to use emojis in your urls</Title>
                    <Divider/>
                    <Paragraph>
                        比较有趣，不过没什么难度直接上图
                    </Paragraph>
                </Typography>
                <img src={useImg} style={{display:'block', marginBottom: '20px'}} alt="Hash动画描述"/>                    
                <Tooltip title="点击后注意url">
                    <Button type="primary" onClick={this.showUrl}>test</Button>
                </Tooltip>
                <Tooltip title="点击后注意url">
                    <Button type="primary" onClick={this.showUrl1} style={{display:'inline-block', marginLeft: '20px'}}>test</Button>
                </Tooltip>    
                <Tooltip title="点击后注意url">
                    <Button style={{display:'inline-block', marginLeft: '20px'}} onClick={this.stop}>stop</Button>                
                </Tooltip>    
            </div>
        )
    }
}