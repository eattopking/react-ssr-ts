import React from "react";
import { Layout, Input, Button, Form, message } from "antd";

const { Content, Footer } = Layout;
const axios = require("axios");

function Register({ form }: { form: { getFieldDecorator: Function; validateFields: Function } }) {
  const { getFieldDecorator, validateFields } = form;
  const handleSubmit = (e: { preventDefault: Function }) => {
    e.preventDefault();
    validateFields((err: any, values: any) => {
      if (!err) {
        axios.get("/registerin", { params: values }).then((res: any) => {
          const {
            data: { status, data }
          } = res;
          if (status) {
            message.info("注册成功");
          } else if (data === 1) {
            message.info("该用户已经注册请直接登录");
          } else {
            message.info("密码长度不能小于七位");
          }
        });
      }
    });
  };
  return (
    <Layout>
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator("mail", {
                  rules: [{ required: true, message: "Please input your username!" }]
                })(<Input placeholder="用户" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "Please input your Password!" }]
                })(<Input type="password" placeholder="密码" />)}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>注册界面</Footer>
    </Layout>
  );
}

const RegisterForm = Form.create({})(Register);
export default RegisterForm;
