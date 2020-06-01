import React,{Component} from 'react';
import { aget } from '../../../api/ajax';
import { List , Icon, Input, Select } from 'antd';
import './index.scss';

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);
const Search = Input.Search;
const Option = Select.Option;
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [],total:0,pageSize:10,page:1,name:'',type:0 };
    }
    componentDidMount() {
        this.getData('',0);
    }
    getData (name,type) {
        const that = this;
        aget(`${global.serviceUrl}/goods?page=${that.state.page}&pageSize=${that.state.pageSize}&name=${name}&type=${type}`).then((res) => {
            console.log(res);
            if (res.data!=null&&res.data.length>0) {
                this.setState({
                    data: res.data,
                    total: res.total,
                    page: res.page
                });
            }
        });
    }
    render() {
        return (
            <div className="bmain">
                <Search
                    placeholder="请输入商品名称"
                    onSearch={value => {
                        this.setState({
                            name: value,
                            page: 1
                        });
                        this.getData(value,this.state.type);
                    }}
                    style={{ width: 250 }}
                />
                <Select defaultValue="1" style={{ width: 120,marginLeft: 30, }} onChange={value => {
                    this.setState({
                        type: value,
                        page: 1
                    });
                    this.getData(this.state.name,Number(value));
                }}>
                    <Option value="1">酒水、饮料</Option>
                    <Option value="2">食品</Option>
                    <Option value="3">日用品</Option>
                    <Option value="4">烟</Option>
                    <Option value="5">生鲜蔬菜</Option>
                </Select>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                    onChange: page => {
                        console.log(page);
                        this.setState({
                            page: page
                        });
                        this.getData(this.state.name,this.state.type);
                    },
                    pageSize: this.state.pageSize,
                    }}
                dataSource={this.state.data}
                footer={
                <div>
                    <b>总条数:{this.state.total},当前页:{this.state.page}</b>
                </div>
                }
                renderItem={item => (
                <List.Item
                    key={item.id}
                    actions={[
                        <IconText type="star-o" text={parseInt(Math.random(0,9)*500)} key="list-vertical-star-o" />,
                        <IconText type="like-o" text={parseInt(Math.random(0,9)*1000)} key="list-vertical-like-o" />,
                        <IconText type="message" text={parseInt(Math.random(0,9)*600)} key="list-vertical-message" />,
                    ]}
                    extra={
                        <img
                            width={180}
                            alt="logo"
                            src={item.goods_img}
                        />}
                >
                    <List.Item.Meta
                        title={item.goods_name}
                        description={'品牌：'+item.brand+'、产地：'+item.home+'、保质期：'+item.prime_date}
                    />
                        <span className='block'>{'所属公司：'+item.supplier}</span>
                        {'￥'+(item.price/100).toFixed(2)+'/'+item.type+item.unit}
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}