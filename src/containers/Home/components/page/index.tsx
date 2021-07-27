import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, Form, message, Input, List } from 'antd';
import * as pageActions from './store/widgets';
import './index.less';

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
    <div className="page">
      <div className="header">
        <div className="title">
          回忆墙
        </div>
        <Button
          className="btn"
          onClick={handleAdd}
        >
          发表留言
        </Button>
      </div>
      <div className="container">

        <div className="list">
          <List
            dataSource={rows}
            renderItem={item => {
              const { info, name } = item;
              return (
                <List.Item>
                  <List.Item.Meta
                    title={<div>{name}</div>}
                    description={info}
                  />
                </List.Item>
              );
            }}
          />
        </div>
      </div>

      {/* 输入留言 */}
      <Modal
        title="输入留言"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form className="login-form">
          <Form.Item>
            {getFieldDecorator('info', {
              rules: [{ required: true, message: '请输入留言!' }],
            })(<Input.TextArea
              style={{
                resize: 'none',
                height: '100px'
              }}
              placeholder="留言"
            />)}
          </Form.Item>
        </Form>
      </Modal>
    </div>
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
