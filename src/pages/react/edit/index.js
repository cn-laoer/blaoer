import React,{Component} from 'react';
import { Form, Input, Button, message, Switch, Icon } from 'antd';
import { aget } from '../../../api/ajax';
// 富文本编辑器
import E from 'wangeditor';
import History from '../../../api/history';
import './index.scss';

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
let matchs = '';
let Data = '';

class editForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            data: '',
            prop: props
        };
    }
    editData (data) {
        aget(`${global.serviceUrl}/react/add`,data).then((res) => {
            console.log(res);
            if (res.code===0) {
                message.success('添加成功');
                setTimeout(()=>{
                    // window.location.href = '/react';
                    History.push({pathname:`/react`});
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
                values.delete === true ? values.delete = 1: values.delete = 0;
                values.status === true ? values.status = 1: values.status = 2;
                console.log('Received values of form: ', values);
                // this.addData(values);
            }
        });
    }
    titleValidate = (rule, value, callback) => {
        // const { form } = this.props;
        if (value && value.length>100) {
          callback('标题长度不能超过100位!');
        } else {
          callback();
        }
    }
    descValidate = (rule, value, callback) => {
        // const { form } = this.props;
        if (value && value.length>100) {
          callback('描述长度不能超过100位!');
        } else {
          callback();
        }
    }
    authorValidate = (rule, value, callback) => {
        // const { form } = this.props;
        if (value && value.length>40) {
          callback('作者长度不能超过40位!');
        } else {
          callback();
        }
    }
    goBack() {
        History.push({pathname:`/react`});
    }
    render (){
        const { getFieldDecorator } = this.props.form;
        // const { autoCompleteResult } = this.state;
        return (
            <div className="bmain" >
                <Button type="primary" 
                    onClick={()=>{this.goBack()}}>
                    <Icon type="left" />
                    Go back
                </Button>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="标题">
                        {getFieldDecorator('title', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入标题'
                                },
                                {
                                    validator: this.titleValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="作者">
                        {getFieldDecorator('author', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入作者'
                                },
                                {
                                    validator: this.authorValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="描述">
                        {getFieldDecorator('description', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入描述'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="内容">
                        {getFieldDecorator('content', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入内容'
                                }
                            ]
                        })(<div ref={(e) => {this.refEditor = e}}></div>)}
                    </Form.Item>
                    <Form.Item label="能否删除">
                        {getFieldDecorator('delete', { valuePropName: 'checked' })(
                            <Switch />
                        )}
                    </Form.Item>
                    <Form.Item label="是否上架">
                        {getFieldDecorator('status', { valuePropName: 'checked' })(
                            <Switch />
                        )}
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
    getData () {
        aget(`${global.serviceUrl}/react/detail`,{id: Number(matchs.params.id)}).then((res) => {
            console.log(res);
            let resData = res;
            if (resData.code === 0) {
                // this.setState({
                //     data: resData.data
                // });
                Data = resData.data;
            }
        });
    }
    componentDidMount() {
        // this.getData();
        // console.log(this.props);
        // console.log(this.state.prop);
        const elem = this.refEditor;
        const editor = new E(elem);
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            // console.log(html);
            if (editor.txt.text()&&editor.txt.text()!==''&&editor.txt.text().length>0) {
                this.props.form.setFieldsValue({'content':html})
            } else {
                this.props.form.setFieldsValue({'content':''})                
            }
        }
        editor.create();
        editor.txt.html = Data.content;
        this.props.form.setFieldsValue({
            title: Data.title,
            author: Data.author,
            description: Data.description,
            delete: Data.delete===1?true:false,
            status: Data.status===1?true:false,
        });
    }
}

const EditFormDom = Form.create({name: 'addForm'})(editForm);
export default class ReEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        matchs = this.props.match;
    }
    render() {
        return (
            <EditFormDom></EditFormDom>
        )
    }
}
