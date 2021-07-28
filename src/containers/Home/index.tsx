import React from "react";
import { Layout } from "antd";
import { Route } from "react-router-dom";
import routes from "./routes";
const { Content } = Layout;

export default function PageLayout() {
  return (
    <Layout>
      <Content>
        {routes.map(routeConfig => {
          return <Route {...routeConfig} />;
        })}
      </Content>
    </Layout>
  );
}
