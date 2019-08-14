import React,{Component} from 'react';
import {Table, Typography, Divider, Tooltip, Input } from 'antd';
import './index.scss';
import webFontShow from '../../../assets/images/web_font_dom.png';
import webPageToSvg from '../../../assets/images/web_font_page_to_svg.png';
import webPageToCode from '../../../assets/images/web_font_page_to_code.png';
import webPageToCode1 from '../../../assets/images/web_font_page_to_code1.png';

const {Title, Paragraph, Text} = Typography;
const {TextArea} = Input;
const fontArr = [
    '&#x51522;',
    '&#x64633;',
    '&#x98977;',
    '&#x87844;',
    '&#x23211;',
    '&#x45466;',
    '&#x61622;',
    '&#x73766;',
    '&#x53588;',
    '&#x20211;'
];
const data = [
    {
        name: 'John Brown',
        age: 32,
        action: 10086
    },
    {
        name: 'Jim Green',
        age: 42,
        action: 102255
    },
    {
        name: 'Bob',
        age: 22,
        action: 10586
    },
    {
        name: 'Tony',
        age: 34,
        action: 10386
    },
    {
        name: 'John Tom',
        age: 12,
        action: 11231
    },
    {
        name: 'Alice',
        age: 37,
        action: 10058
    },
    {
        name: 'Johns',
        age: 45,
        action: 10011
    }
];

export default class Home extends Component {
    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
                <span>{text}</span>
            ),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text) => (
                <span style={{color:'#1890ff', cursor: 'pointer'}}>
                    {
                        (()=>{
                            let res = '';
                            let nowArr = String(text.action).split('');
                            for (let i=0;i<nowArr.length;i++) {
                                if (nowArr[i]<10) {
                                    for (let l=0;l<fontArr.length;l++) {
                                        if (Number(nowArr[i])===l) {
                                            res += fontArr[l];
                                        }
                                    }
                                } else {
                                    res += nowArr[i];
                                }
                            }
                            return (
                                <Tooltip title="F12 审查元素">
                                    <span className="my_webfont" dangerouslySetInnerHTML={{ __html: res }}></span>
                                </Tooltip>
                            )
                        })()
                    }
                </span>
            ),
        },
    ];
    getFontNum(num) {
        let result = '';
        let nowArr = String(num).split('');
        for (let i=0;i<nowArr.length;i++) {
            if (nowArr[i]<10) {
                for (let l=0;l<fontArr.length;l++) {
                    if (nowArr[i]===l) {
                        result += fontArr[l];
                    }
                }
            } else {
                result += nowArr[i];
            }
        }
        return result;
    }
    render() {
        return (
            <div className="bmain">
                <Title level={2}>webFont 介绍</Title>
                <Paragraph>
                    web-font是CSS3中的一种标记 @font-face，在@font-face声明里，你可以声明一种字体，指定这种字体字体库文件从网络某个地址下载。
                </Paragraph>
                <Divider/>
                <Title level={3}>使用自定义web-font实现数据防采集</Title>
                <Text strong>防采集原理：</Text>
                <Paragraph>
                    使用web-font可以从网络加载字体，因此我们可以自己创建一套字体，设置自定义的字符映射关系表。<br/>
                    例如设置0xaaa是映射字符1，0xbbb是映射字符2，以此类推。<br/>
                    当需要显示字符1时，网页的源码只会是0xaaa，被采集的也只会是0xaaa，并不是1，使采集者采集不到正确的数据。而对于正常访问的用户则没有影响。<br/>
                    对于中文的防采集不适合使用web-font这种方法，因为中文的字体库太大。而对于数字，英文则适合使用此方法实现防采集。<br/>
                </Paragraph>
                <Title level={3}>自定义webFont 预览</Title>
                <Table columns={this.columns} bordered pagination={false} dataSource={data} rowKey={record => record.age} className="mb15"/>
                <Title level={4}>审查元素如下</Title>
                <img src={webFontShow} alt="webFontImg" className="descImg"/>
                <Divider/>
                <Title level={4}>实例：使用自定义web-font实现数字数据防采集</Title>
                <Paragraph>
                    <Text strong>1.创建指定字符的自定义字体</Text><br/>
                    导入自己的一款字体文件，需要时ttf格式，讲ttf转svg<br/>
                    进入 <a href="https://everythingfonts.com/ttf-to-svg" target="_black">https://everythingfonts.com/ttf-to-svg</a><br/>
                    上传ttf文件，将字体文件转为svg格式，并下载svg格式字体文件 另存为my_webfont.svg
                </Paragraph>
                <img src={webPageToSvg} alt="webFontImg" className="descImg"/>
                <Paragraph>
                    <Text strong>2.选择需要使用的字符及设置字体映射关系</Text><br/>
                    进入 <a href="https://icomoon.io/app/#/select" target="_black">https://icomoon.io/app/#/select</a><br/>
                    选择左上角 Import Icons 按钮，导入my_webfont.svg <br/>
                    导入后选择我们要使用的字符，这里我只使用了0-9, 然后点击右下角 Generate Font 按钮
                </Paragraph>
                <img src={webPageToCode1} alt="webFontImg" className="descImg1"/>
                <Paragraph>
                    我们这里修改映射关系，可以尽量复杂一点且没有规律，使不容易猜出。(如下图)<br/>
                    并把名字也按映射关系修改，设置映射关系后，点击右下角download下载字体。
                </Paragraph>
                <img src={webPageToCode} alt="webFontImg" className="descImg1"/>
                <Divider/>
                <Title level={4}>在网页中使用web-font显示数据</Title>
                <Paragraph>
                    <Text strong>1.首先需要设置 @font-face</Text><br/>
                    <TextArea
                        autosize={{ minRows: 2, maxRows: 6 }}
                        value="@font-face {
                            font-family: 'my_webfont';
                            src:  url('fonts/my_webfont.eot?fdipzone');
                            src:  url('fonts/my_webfont.eot?fdipzone#iefix') format('embedded-opentype'),
                            url('fonts/my_webfont.ttf?fdipzone') format('truetype'),
                            url('fonts/my_webfont.woff?fdipzone') format('woff'),
                            url('fonts/my_webfont.svg?fdipzone#my_webfont') format('svg');
                        }"
                    />
                    <Text strong>2.然后需要定义一个css的class，font-family使用这个web-font</Text><br/>
                    <TextArea
                        autosize={{ minRows: 2, maxRows: 6 }}
                        value=".my_webfont{
                            font-family: my_webfont !important;
                            -webkit-font-smoothing: antialiased;
                            -moz-osx-font-smoothing: grayscale;
                        }"
                    />
                    <Text strong>3.在需要显示这种数据的地方，填入数据，且容器的class定义为my_webfont</Text><br/>
                    这样就可以显示字符1了。
                    <TextArea
                        autosize={{ minRows: 2, maxRows: 6 }}
                        value="<p class='my_webfont'>&#xffccc ;</p>"
                    />
                </Paragraph>
            </div>
        )
    }
}