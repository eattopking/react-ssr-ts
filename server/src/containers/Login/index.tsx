import React from "react";
import { Layout, Input, Button, Form } from "antd";

const { Content, Footer } = Layout;

const axios = require("axios");

function Login({ form }: { form: { getFieldDecorator: Function; validateFields: Function } }) {
  const { getFieldDecorator, validateFields } = form;
  const handleSubmit = (e: { preventDefault: Function }) => {
    e.preventDefault();
    validateFields((err: any, values: any) => {
      if (!err) {
        axios.get("/signin", { params: values }).then((res: any) => {
          console.log("ok", res);
        });
        console.log("Received values of form: ", values);
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
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>登录界面</Footer>
    </Layout>
  );
}

const LoginForm = Form.create({})(Login);
export default LoginForm;
