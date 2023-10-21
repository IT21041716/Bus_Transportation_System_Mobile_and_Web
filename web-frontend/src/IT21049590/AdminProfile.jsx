import React, { useState } from "react";
import { Tabs } from "antd";
import ReservationCancel from "./ReservationCancel";
import Layout, { Content, Header } from "antd/es/layout/layout";
import "./Journey.css";
import Navbar from "../IT21041716/scenes/header";

const { TabPane } = Tabs;

function AdminProfile() {
  const [activeTab, setActiveTab] = useState("2");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <Layout className="MainCon">
      <Navbar />

      <Content>
        <div style={{ margin: "290px" }}>
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="Reservation Cancel" key="2">
              <ReservationCancel />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}

export default AdminProfile;
