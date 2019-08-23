import React, { useState, useEffect } from "react";
import { Table, Divider, Button } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as diffActions from "./store/actions";

const DiffTable = ({ dispatch, rows }: { dispatch: any; rows: [] }) => {
  // action集合
  const actions = bindActionCreators(diffActions, dispatch);

  // 表格模版
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
      key: "address",
      width: 80
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
const mapStateToProps = (state: { diff: { rows: [] } }) => {
  return {
    rows: state.diff.rows
  };
};

// 这是在服务端渲染的时候获取数据填充到组件内的,并将数据注水的作用
export const diffLoadData = (store: { dispatch: Function }) => {
  return store.dispatch(diffActions.addrow());
};

export default connect(mapStateToProps)(DiffTable);
