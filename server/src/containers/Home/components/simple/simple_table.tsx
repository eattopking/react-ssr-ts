import React, { useState } from "react";
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
      render: (text: any) => <a href="javascript:;">{text}</a>
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <span>
          <a href="javascript:;">Invite {record.name}</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
        </span>
      )
    }
  ]);

  // 增行
  const addRow = () => {
    actions.addrow();
  };

  return (
    <>
      <Button onClick={addRow}>增行</Button>
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

export const simpleLoadData = (store: { dispatch: Function }) => {
  store.dispatch(simpleActions.addrow());
};

export default connect(mapStateToProps)(simpleTable);
