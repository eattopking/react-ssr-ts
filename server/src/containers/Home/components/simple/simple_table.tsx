import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Table, Divider, Button } from "antd";
import * as simpleActions from "./store/actions";

const simpleTable = ({ dispatch, rows }: { dispatch: any; rows: [] }) => {
  // action集合
  const actions = bindActionCreators(simpleActions, dispatch);

  // 表格列选项
  const [columns] = useState([
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 80,
      render: (text: any) => <a href="javascript:;">{text}</a>
    },
    {
      title: "Age",
      dataIndex: "age",
      width: 80,
      key: "age"
    },
    {
      title: "Address",
      dataIndex: "address",
      width: 80,
      key: "address"
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (text: any, record: any) => (
        <span>
          <a href="javascript:;">Invite {record.name}</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
        </span>
      )
    }
  ]);

  // 首次加载获取数据 相当于didmount
  useEffect(() => {
    actions.addrow();
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={rows} pagination={false} />
    </>
  );
};

// 将store上的state同步到props上
const mapStateToProps = (state: { simple: { rows: [] } }) => {
  return {
    rows: state.simple.rows
  };
};

// 这是在服务端渲染的时候获取数据填充到组件内的,并将数据注水的作用
export const simpleLoadData = (store: { dispatch: Function }) => {
  return store.dispatch(simpleActions.addrow());
};

export default connect(mapStateToProps)(simpleTable);
