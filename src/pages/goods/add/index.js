import React,{Component} from 'react';
import { Form, Input, Button, message, Switch, DatePicker } from 'antd';
import { aget } from '../../../api/ajax';
import History from '../../../api/history';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 11,
      },
    },
};
const dateFormat = 'YYYY/MM/DD';

class addForm extends Component {
    state = {
        confirmDirty: false,
        exceedDate: '',
        autoCompleteResult: [],
    }
    
    addData (data) {
        aget(`${global.serviceUrl}/goods/add`,data).then((res) => {
            console.log(res);
            if (res.code===0) {
                message.success('添加成功');
                setTimeout(()=>{
                    // window.location.href = '/react';
                    History.push({pathname:`/goods`});
                },800);
            } else {
                message.error(res.msg);
            }
        });
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let openDate = new Date(values.production_date._d).getTime();
                let datestamp = new Date(openDate);
                let Y = datestamp.getFullYear();
                let M = (datestamp.getMonth()+1)<10?'0'+(datestamp.getMonth()+1):(datestamp.getMonth()+1);
                let D = datestamp.getDate()<10?'0'+datestamp.getDate():datestamp.getDate();
                let openDateStr = Y+'-'+M+'-'+D;
                values.production_date = openDateStr;
                console.log('Received values of form: ', values);
                values.delete === true ? values.delete = 1: values.delete = 0;
                values.hot === true ? values.hot = 1: values.hot = 0;
                // this.addData(values);
            }
        });
    }
    titleValidate = (rule, value, callback) => {
        // const { form } = this.props;
        if (value && value.length>30) {
          callback('名称长度不能超过30位!');
        } else {
          callback();
        }
    }
    descValidate = (rule, value, callback) => {
        // const { form } = this.props;
        if (value && value.length>100) {
          callback('长度不能超过100位!');
        } else {
          callback();
        }
    }
    authorValidate = (rule, value, callback) => {
        // const { form } = this.props;
        if (value && value.length>100) {
          callback('条码不能超过100位!');
        } else {
          callback();
        }
    }
    imgValidate = (rule, value, callback) => {
        // const { form } = this.props;
        if (value && value.length>1000) {
          callback('图片地址不能超过1000位!');
        } else {
          callback();
        }
    }
    render (){
        const { getFieldDecorator } = this.props.form;
        // const { autoCompleteResult } = this.state;
        return (
            <div className="bmain" >
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="名称">
                        {getFieldDecorator('goods_name', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入商品名称'
                                },
                                {
                                    validator: this.titleValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="条码">
                        {getFieldDecorator('bar_code', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入商品条码'
                                },
                                {
                                    validator: this.authorValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="品牌">
                        {getFieldDecorator('brand', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入品牌'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="净含量">
                        {getFieldDecorator('weight', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入净含量'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="供应商">
                        {getFieldDecorator('supplier', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入供应商'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="商品单位">
                        {getFieldDecorator('unit', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入商品单位，包，件，只等'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="规格数量">
                        {getFieldDecorator('size', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入瓶或1*24等'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="售价（分）">
                        {getFieldDecorator('price', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入售价'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="图片地址">
                        {getFieldDecorator('goods_img', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入图片地址'
                                },
                                {
                                    validator: this.imgValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="库存">
                        {getFieldDecorator('stock', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入商品库存'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="生产日期">
                        {getFieldDecorator('production_date', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入生产日期'
                                }
                            ]
                        })(<DatePicker format={dateFormat} onChange={(date, dateString)=>{
                            // console.log(date+'==='+dateString);
                            let primeStr = this.props.form.getFieldValue('prime_date');
                            let prime = 0;
                            if (primeStr!=null&&primeStr.indexOf('天')!==-1) {
                                prime = Number(primeStr.substring(0, primeStr.length - 1)); 
                            } else {
                                prime = Number(primeStr);
                            }
                            let openDate = new Date(dateString).getTime();
                            let openDatestamp = new Date(openDate+(prime*24*60*60*1000));
                            let Y = openDatestamp.getFullYear();
                            let M = (openDatestamp.getMonth()+1)<10?'0'+(openDatestamp.getMonth()+1):(openDatestamp.getMonth()+1);
                            let D = openDatestamp.getDate()<10?'0'+openDatestamp.getDate():openDatestamp.getDate();
                            let exceedDateStr = Y+'-'+M+'-'+D;
                            this.props.form.setFieldsValue({'exceed_date':exceedDateStr});
                        }} />)}
                        {/* {getFieldDecorator('production_date', {
                            initialValue: [moment('2020-06-01', 'YYYY/MM/DD'), 
                            moment('2090-06-01', 'YYYY/MM/DD')] 
                        })(<DatePicker format={dateFormat} onChange={(date, dateString)=>{
                            console.log(date+'==='+dateString);
                        }} />)})} */}
                    </Form.Item>
                    <Form.Item label="保质期（天）">
                        {getFieldDecorator('prime_date', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入保质期（天）'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input onChange={e => {
                            e.persist();
                            // console.log(e.target.value);
                            let primeStr = e.target.value;
                            let prime = 0;
                            if (primeStr.indexOf('天')!==-1) {
                                prime = Number(primeStr.substring(0, primeStr.length - 1)); 
                            } else {
                                prime = Number(e.target.value);
                            }
                            let openDate = new Date(this.props.form.getFieldValue('production_date')).getTime();
                            let openDatestamp = new Date(openDate+(prime*24*60*60*1000));
                            let Y = openDatestamp.getFullYear();
                            let M = (openDatestamp.getMonth()+1)<10?'0'+(openDatestamp.getMonth()+1):(openDatestamp.getMonth()+1);
                            let D = openDatestamp.getDate()<10?'0'+openDatestamp.getDate():openDatestamp.getDate();
                            let exceedDateStr = Y+'-'+M+'-'+D;
                            this.props.form.setFieldsValue({'exceed_date':exceedDateStr});
                          }}/>)}
                    </Form.Item>
                    <Form.Item label="过期日期">
                        {getFieldDecorator('exceed_date', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入过期日期'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input disabled />)}
                    </Form.Item>
                    <Form.Item label="产地">
                        {getFieldDecorator('home', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入产地'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="是否热门">
                        {getFieldDecorator('hot', { valuePropName: 'checked' })(<Switch />)}
                    </Form.Item>
                    {/* <Form.Item label="内容">
                        {getFieldDecorator('content', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入内容'
                                }
                            ]
                        })(<div ref={(e) => {this.refEditor = e}}></div>)}
                    </Form.Item> */}
                    <Form.Item label="是否删除">
                        {getFieldDecorator('delete', { valuePropName: 'checked' })(<Switch />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            添加
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
    componentDidMount() {
        // const elem = this.refEditor;
        // const editor = new E(elem);
        // // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        // editor.customConfig.onchange = html => {
        //     // console.log(html);
        //     if (editor.txt.text()&&editor.txt.text()!==''&&editor.txt.text().length>0) {
        //         this.props.form.setFieldsValue({'content':html})
        //     } else {
        //         this.props.form.setFieldsValue({'content':''})                
        //     }
        // }
        // editor.create();
    }
}

const AddFormDom = Form.create({name: 'addForm'})(addForm);
export default class ReAdd extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }
    render() {
        return (
            <AddFormDom></AddFormDom>
        )
    }
}
