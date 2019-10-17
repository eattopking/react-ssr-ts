import React from "react";
import { Layout, Input, Button, Form } from "antd";

const { Content, Footer } = Layout;
const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 8 },
    sm: { span: 8 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};
const handleSubmit = (e: object) => {
  console.log(e);
};
function Login({ form }: { form: { getFieldDecorator: Function } }) {
  console.log(form)
  const { getFieldDecorator } = form;
  return (
    <Layout>
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Form {...formItemLayout} onSubmit={handleSubmit}>
              <Form.Item label="E-mail">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "The input is not valid E-mail!"
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your password!"
                    },
                    {
                      validator: ""
                    }
                  ]
                })(<Input.Password />)}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
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

const LoginForm = Form.create({ name: "register" })(Login);
export default LoginForm;
