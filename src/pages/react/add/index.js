import React,{Component} from 'react';
import { Form, Input, Button, message } from 'antd';
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

class addForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    }
    
    addData (data) {
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
                console.log('Received values of form: ', values);
                this.addData(values);
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
    render (){
        const { getFieldDecorator } = this.props.form;
        // const { autoCompleteResult } = this.state;
        return (
            <div className="bmain" >
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
