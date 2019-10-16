import React from "react";
import { Layout, InputNumber, Input, Button } from "antd";

const { Content, Footer } = Layout;

export default function Login() {
  return (
    <Layout>
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <div>
              邮箱: <Input />
              密码: <InputNumber />
              <Button>登录</Button>
            </div>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>登录界面</Footer>
    </Layout>
  );
}
