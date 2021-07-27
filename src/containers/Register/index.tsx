import React from "react";
import { Input, Button, Form, message } from "antd";
const { Item } = Form;
const axios = require("axios");

import './index.less';

function Register({
  form
}: {
  form: { getFieldDecorator: Function; validateFields: Function };
}) {
  const {
    getFieldDecorator,
    validateFields
  } = form;
  const handleSubmit = (e: { preventDefault: Function }) => {
    e.preventDefault();
    validateFields((err: any, values: any) => {
      if (!err) {
        axios.get("/api/registerIn", { params: values }).then((res: any) => {
          const {
            data: {
              status,
              data
            }
          } = res;
          if (status) {
            message.info("注册成功");

            setTimeout(() => {
              window.location.pathname = "/login";
            }, 1000);

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
    <div>
      <div className="header">
        欢迎注册回忆墙
      </div>
      <Form onSubmit={handleSubmit}>
        <Item
          label="邮箱"
          className="form-item"
        >
          {getFieldDecorator("mail", {
            rules: [
              { required: true, message: "请输入邮箱!" }
            ]
          })(<Input placeholder="邮箱" />)}
        </Item>
        <Item
          label="用户名"
          className="form-item"
        >
          {getFieldDecorator("name", {
            rules: [
              { required: true, message: "请输入用户名!" }
            ]
          })(<Input placeholder="用户名" />)}
        </Item>
        <Item
          label="密码"
          className="form-item"
        >
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "请输入密码!" }
            ]
          })(<Input type="password" placeholder="密码" />)}
        </Item>
        <Item
          className="form-item"
        >
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            注册
          </Button>
        </Item>
      </Form>
    </div>
  );
}

const RegisterForm = Form.create({})(Register);
export default RegisterForm;
