import React,{Component} from 'react';
import './index.scss';
import { Form, Icon, Input, Button, message } from 'antd';
import loginBg from '../../assets/images/login_bg.jpg';
import {apost} from '../../api/ajax';
import {isLogin} from '../../util/index';
import History from '../../api/history';
import md5 from 'js-md5';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
  
class HorizontalLoginForm extends React.Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
        console.log(md5('laolaoer666er'));
    }
  
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.password = md5('lao'+values.password+'er');
                // console.log('Received values of form: ', values);
                apost(`${global.serviceUrl}/login`,values).then((res) => {
                    // console.log(res);
                    if (res.code===1) {
                        message.success('登录成功');
                        isLogin.setLogin('true');
                        setTimeout(()=>{
                            History.push('/');
                        },1200);
                    } else {
                        message.error(res.msg);
                    }
                });
            }
        });
    };
  
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        className="input"
                        />,
                    )}
                </Form.Item>
                <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        className="input"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);
export default class Login extends Component {
    render() {
        return (
            <div className="background">
                <div className="login">
                    <div className="bg-login">
                        <WrappedHorizontalLoginForm></WrappedHorizontalLoginForm>
                    </div>
                </div>
                <img src={loginBg} alt="bg" className="dot"/>
            </div>
        )
    }
}