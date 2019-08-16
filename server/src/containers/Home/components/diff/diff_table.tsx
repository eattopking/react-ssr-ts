import React, { useState } from "react";
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
const mapStateToProps = (state: { diff: { rows: [] } }) => {
  return {
    rows: state.diff.rows
  };
};

export default connect(mapStateToProps)(DiffTable);
