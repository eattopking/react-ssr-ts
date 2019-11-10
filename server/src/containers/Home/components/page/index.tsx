import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Table, Button, Modal, Form, message, Input } from "antd";
import * as pageActions from "./store/widgets";

const axios = require("axios");

const Page = ({
  dispatch,
  rows,
  form
}: {
  dispatch: any;
  rows: [];
  form: { getFieldDecorator: Function; validateFields: Function };
}) => {
  const { getFieldDecorator, validateFields } = form;
  // action集合
  const actions = bindActionCreators(pageActions, dispatch);
  const [visible, setVisible] = useState(false);
  // 表格列选项
  const [columns] = useState([
    {
      title: "名字",
      dataIndex: "name",
      key: "name",
      width: 80
    },
    {
      title: "地址",
      dataIndex: "address",
      width: 80,
      key: "address"
    },
    {
      title: "额外信息",
      dataIndex: "infomation",
      width: 80,
      key: "infomation"
    }
  ]);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleAdd = () => {
    setVisible(true);
  };

  const handleOk = (e: { preventDefault: Function }) => {
    e.preventDefault();
    validateFields((err: any, values: any) => {
      if (!err) {
        alert(333344444)
        axios.get("/signin", { params: values }).then((res: any) => {
          const {
            data: { status }
          } = res;
          if (status) {
            window.location.href = "http://eattopking.top:8000/page";
          } else {
            message.info("用户名或密码不正确,请重新输入");
          }
        });
      }
    });
  };

  return (
    <>
      <Button onClick={handleAdd}>添加</Button>
      <Modal title="Basic Modal" visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <Form className="login-form">
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
        </Form>
      </Modal>
      <Table columns={columns} dataSource={rows} pagination={false} />
    </>
  );
};

// 将store上的state同步到props上
const mapStateToProps = (state: { page: { rows: [] } }) => {
  return {
    rows: state.page.rows
  };
};

// 这是在服务端渲染的时候获取数据填充到组件内的,并将数据注水的作用
// export const simpleLoadData = (store: { dispatch: Function }) => {
//   return store.dispatch(simpleActions.addrow());
// };

export default connect(mapStateToProps)(Form.create({})(Page));
