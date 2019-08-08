import React, { useState } from "react";
import { Table, Divider, Tag, Button } from "antd";
const axios = require("axios");

export default function DiffTable() {
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
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags: any) => (
        <span>
          {tags.map((tag: any) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      )
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
  const [data, setData] = useState([
    {
      key: "1",
      name: "复杂表格",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"]
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"]
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"]
    }
  ]);
  const addRow = () => {
    axios.get("./addrow").then((response: { data: { row: [] } }) => {
      setData(response.data.row);
    });
  };
  const delRow = () => {
    axios.get("./delete").then((response: { data: { row: [] } }) => {
      setData(response.data.row);
    });
  };
  return (
    <div>
      <Button onClick={addRow}>增行</Button>
      <Button onClick={delRow}>删行</Button>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
}
