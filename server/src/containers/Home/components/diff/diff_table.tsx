import React, { useState, useEffect } from "react";
import { Table, Divider, Button } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as diffActions from "./store/actions";

const DiffTable = ({ dispatch, rows }: { dispatch: any; rows: [] }) => {
  // action集合
  let actions = bindActionCreators(diffActions, dispatch);

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
  // const [data, setData] = useState([
  //   {
  //     key: "1",
  //     name: "复杂表格",
  //     age: 32,
  //     address: "New York No. 1 Lake Park",
  //     tags: ["nice", "developer"]
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     age: 42,
  //     address: "London No. 1 Lake Park",
  //     tags: ["loser"]
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sidney No. 1 Lake Park",
  //     tags: ["cool", "teacher"]
  //   }
  // ]);
  const addRow = () => {
    actions.addrow();
  };
  // const delRow = () => {
  //   axios.get("./delete").then((response: { data: { row: [] } }) => {
  //     setData(response.data.row);
  //   });
  // };
  return (
    <div>
      <Button onClick={addRow}>增行</Button>
      {/* <Button onClick={delRow}>删行</Button> */}
      <Table columns={columns} dataSource={rows} pagination={false} />
    </div>
  );
};

// 将store上的state同步到props上
const mapStateToProps = (state: { diffReducer: { rows: [] } }) => {
  return {
    rows: state.diffReducer.rows
  };
};

export default connect(mapStateToProps)(DiffTable);
