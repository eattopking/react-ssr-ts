import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Table, Button } from "antd";
import * as pageActions from "./store/widgets";

const Page = ({ dispatch, rows }: { dispatch: any; rows: [] }) => {
  // action集合
  const actions = bindActionCreators(pageActions, dispatch);

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

  return (
    <>
      <Button>添加</Button>
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

export default connect(mapStateToProps)(Page);