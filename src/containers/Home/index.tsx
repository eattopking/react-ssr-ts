import React from "react";
import { Layout } from "antd";
import { Route } from "react-router-dom";
import routes from "./routes";
const { Content } = Layout;

export default function PageLayout() {
  return (
    <Layout>
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {routes.map(routeConfig => {
              return <Route {...routeConfig} />;
            })}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}
