import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Button, Modal, Form, message, Input } from 'antd';
import * as pageActions from './store/widgets';

const axios = require('axios');

const Page = ({
  dispatch,
  rows,
  form,
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
      title: '信息',
      dataIndex: 'info',
      key: 'info',
      width: 80,
    },
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
      width: 80,
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
    validateFields(async (err: any, values: any) => {
      if (!err) {
        const addRes = await axios.get('/api/addData', { params: values });
        const {
          data: { status },
        } = addRes;

        if (!status) {
          message.info('添加失败');
        }

        message.info('添加成功');
        const res = await axios.get('/api/pageData');
        const {
          data: { rows },
        } = res;
        handleCancel();
        actions.setAllData(rows);
        return;
      }
    });
  };

  return (
    <>
      <Button onClick={handleAdd}>添加</Button>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form className="login-form">
          <Form.Item>
            {getFieldDecorator('info', {
              rules: [{ required: true, message: 'Please input your info!' }],
            })(<Input placeholder="信息" />)}
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
    rows: state.page.rows,
  };
};

// 这是在服务端渲染的时候获取数据填充到组件内的,并将数据注水的作用
// export const simpleLoadData = (store: { dispatch: Function }) => {
//   return store.dispatch(simpleActions.addrow());
// };

export default connect(mapStateToProps)(Form.create({})(Page));
