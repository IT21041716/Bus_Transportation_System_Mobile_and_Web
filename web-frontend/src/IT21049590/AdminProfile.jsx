import React, { useState } from "react";
import { Tabs } from "antd";
import ReservationCancel from "./ReservationCancel"; 
import Layout, { Content, Header } from "antd/es/layout/layout";

const { TabPane } = Tabs;

function AdminProfile() {
  const [activeTab, setActiveTab] = useState("2"); 

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
        className="site-layout-sub-header-background"
      >
        <h3 style={{ color: "white" }}>Admin Profile</h3>
      </Header>
      <Content>
        <div style={{ margin: "32px" }}>
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
