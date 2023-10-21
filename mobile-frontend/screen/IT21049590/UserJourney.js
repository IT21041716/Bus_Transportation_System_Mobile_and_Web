import React, { useEffect, useState } from "react";
import { View, Text, Modal, Button, Picker, TextInput } from "react-native";

const UserJourney = () => {
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(
    "Kurunagala - Polgahawela"
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const getJourneys = () => {
    // Replace with your data fetching logic using axios or another fetch method
  };

  const saveJourney = () => {
    // Add logic to save a new journey
  };

  const updateJourney = () => {
    // Add logic to update a journey
  };

  const openCancelModal = (data) => {
    // Add logic to open cancel modal
  };

  const cancelJourney = () => {
    // Add logic to cancel a journey
  };

  useEffect(() => {
    getJourneys();
  }, []);

  return (
    <View>
      <Modal visible={addModal} animationType="slide">
        <View>
          <Text>Add New Journey</Text>
          <Picker
            selectedValue={selectedLocation}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedLocation(itemValue);
              // Update selectedPrice based on itemValue
            }}
          >
            {/* Render location options */}
          </Picker>
          <TextInput
            value={selectedDate}
            onChangeText={(text) => setSelectedDate(text)}
            placeholder="Date"
          />
          <TextInput
            value={selectedPrice}
            onChangeText={(text) => setSelectedPrice(text)}
            placeholder="Price"
            keyboardType="numeric"
          />
          <Button title="Save" onPress={saveJourney} />
        </View>
      </Modal>

      {/* Modal for update and cancel goes here */}

      <View>
        <Text>Your Journeys</Text>
      </View>
      <View>{/* Render your table or list of journeys here */}</View>
    </View>
  );
};

export default UserJourney;
