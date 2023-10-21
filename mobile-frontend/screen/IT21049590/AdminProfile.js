import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// Define a simple Tab component for demonstration
const Tab = ({ title, active, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ padding: 10, backgroundColor: active ? 'lightblue' : 'white' }}>
    <Text style={{ fontWeight: active ? 'bold' : 'normal' }}>{title}</Text>
  </TouchableOpacity>
);

function AdminProfile() {
  const [activeTab, setActiveTab] = useState("2");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          backgroundColor: 'blue',
        }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Admin Profile</Text>
      </View>
      <ScrollView>
        <View style={{ margin: 16 }}>
          <Tab title="Reservation Cancel" active={activeTab === "2"} onPress={() => handleTabChange("2")} />
          {/* Add more Tab components here if needed */}
        </View>
        {/* Render the content based on the active tab */}
        {activeTab === "2" && <ReservationCancel />}
        {/* Add more conditional content rendering based on the active tab */}
      </ScrollView>
    </View>
  );
}

export default AdminProfile;
