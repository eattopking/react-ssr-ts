import React from "react";
import { Layout, Menu } from "antd";
import { Link, Route } from "react-router-dom";
import routes from "./routes";
const { Content, Footer, Sider } = Layout;

export default function PageLayout() {
  return (
    <Layout>
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <Sider width={200} style={{ background: "#fff" }}>
            <Menu mode="inline" defaultSelectedKeys={["1"]} style={{ height: "100%" }}>
              <Menu.Item key="1">
                <Link to="/">simpletable</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/diff">difftable</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {routes.map(routeConfig => {
              return <Route {...routeConfig} />;
            })}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>张横服务端渲染表格</Footer>
    </Layout>
  );
}
