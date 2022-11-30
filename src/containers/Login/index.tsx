import React from 'react';
import { Input, Button, Form, message } from 'antd';
const { Item } = Form;
const axios = require('axios');

import './index.less';

/**
 * 登录页组件
 * @param form 高阶组件包裹后,传递过来的form方法
 */
function Login({ form }: { form: { getFieldDecorator: Function; validateFields: Function } }) {
    const { getFieldDecorator, validateFields } = form;
    const handleSubmit = (e: { preventDefault: Function }) => {
        e.preventDefault();
        validateFields((err: any, values: any) => {
            if (!err) {
                axios.get('/api/signIn', { params: values }).then((res: any) => {
                    const {
                        data: { status },
                    } = res;
                    if (status) {
                        window.location.pathname = '/page';
                    } else {
                        message.info('用户名或密码不正确,请重新输入99999ewruiewrwqeir');
                    }
                });
            }
        });
    };

    //跳转到注册页面
    const handleRegister = () => {
        window.location.pathname = '/register';
    };

    return (
        <div>
            <div className="header">欢迎登录回忆墙</div>
            <Form onSubmit={handleSubmit}>
                <Item className="form-item" label="邮箱">
                    {getFieldDecorator('mail', {
                        rules: [{ required: true, message: '请输入邮箱' }],
                    })(<Input placeholder="邮箱" />)}
                </Item>
                <Item label="密码" className="form-item">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(<Input type="password" placeholder="密码" />)}
                </Item>
                <Item className="form-item">
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    <div className="to-register" onClick={handleRegister}>
                        现在注册
                    </div>
                </Item>
            </Form>
        </div>
    );
}

const LoginForm = Form.create({})(Login);
export default LoginForm;
