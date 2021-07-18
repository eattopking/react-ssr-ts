import React from "react";
import { Layout, Input, Button, Form, message } from "antd";
const { Item } = Form;
const { Content, Footer } = Layout;
const axios = require("axios");

/**
 * 登录页组件
 * @param form 高阶组件包裹后,传递过来的form方法
 */
function Login({
  form
}: {
  form: { getFieldDecorator: Function; validateFields: Function };
}) {
  const { getFieldDecorator, validateFields } = form;
  const handleSubmit = (e: { preventDefault: Function }) => {
    e.preventDefault();
    validateFields((err: any, values: any) => {
      if (!err) {
        axios.get("/api/signin", { params: values }).then((res: any) => {
          const {
            data: { status }
          } = res;
          if (status) {
            window.location.pathname = "/page";
          } else {
            message.info("用户名或密码不正确,请重新输入");
          }
        });
      }
    });
  };
  const handleRegister = () => {
    window.location.pathname = "/register";
  };
  return (
    <Layout>
      <Content>
        <Layout>
          <Content>
            <Form onSubmit={handleSubmit}>
              <Item
                label="邮箱"
              >
                {getFieldDecorator("mail", {
                  rules: [
                    { required: true, message: "Please input your username!" }
                  ]
                })(<Input placeholder="用户" />)}
              </Item>
              <Item
                style={{ display: "flex", justifyContent: "center" }}
                label="密码"
              >
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    type="password"
                    placeholder="密码"
                  />
                )}
              </Item>
              <Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
                <div
                  onClick={handleRegister}
                >
                  去注册
                </div>
              </Item>
            </Form>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

const LoginForm = Form.create({})(Login);
export default LoginForm;
