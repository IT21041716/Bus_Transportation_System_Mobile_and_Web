import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  TextInput,
  Button,
  Picker,
} from 'react-native';
import moment from 'moment';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);

  const API_URL = 'http://localhost:5005/journey/';

  const [tableData, setTableData] = useState([]);
  const getJourneys = () => {
    // Simulate API call for table data
    // Replace this with actual API calls in your app
    const response = [
      { createdBy: 'User1', reservedDate: '2023-10-01', location: 'Location1', price: 50, status: 'Active' },
      { createdBy: 'User2', reservedDate: '2023-10-02', location: 'Location2', price: 60, status: 'Active' },
      // Add more data
    ];

    const temp = response.filter((item) => item.status !== 'Pending');
    setTableData(temp);
  };

  useEffect(() => {
    getJourneys();
  }, []);

  const handleEdit = (reservation) => {
    setEditingReservation({
      ...reservation,
      reservedDate: moment(reservation.reservedDate),
    });
    setModalVisible(true);
  };

  const handleDelete = (reservationId) => {
    // Implement your delete logic here
  };

  const handleCancelModalClose = () => {
    setCancelModalVisible(false);
  };

  return (
    <View>
      <ScrollView>
        {tableData.map((reservation, index) => (
          <View key={index}>
            <Text>User ID: {reservation.createdBy}</Text>
            <Text>Reserved Date: {reservation.reservedDate}</Text>
            <Text>Location: {reservation.location}</Text>
            <Text>Price: {reservation.price}</Text>
            <Text>Status: {reservation.status}</Text>
            <Button title="Edit" onPress={() => handleEdit(reservation)} />
            <Button title="Delete" onPress={() => handleDelete(reservation._id)} />
            <Button
              title="Cancel"
              onPress={() => {
                setEditingReservation({ _id: reservation._id });
                setCancelModalVisible(true);
              }}
            />
          </View>
        ))}

        {/* Add/Edit Reservation Modal */}
        <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View>
            <Text>{editingReservation ? 'Edit Reservation' : 'Add Reservation'}</Text>
            <TextInput placeholder="Created By" value={editingReservation?.createdBy} />
            <TextInput placeholder="Reserved Date" value={editingReservation?.reservedDate} />
            <Picker selectedValue={editingReservation?.status}>
              <Picker.Item label="Active" value="active" />
              <Picker.Item label="Not Active" value="not-active" />
            </Picker>
            <TextInput placeholder="Location" value={editingReservation?.location} />
            <Button title="Submit" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>

        {/* Cancel Reservation Modal */}
        <Modal visible={cancelModalVisible} onRequestClose={() => setCancelModalVisible(false)}>
          <View>
            {/* Implement your cancellation form */}
            <Text>ReservationCancelForm Here</Text>
            <Button title="Cancel" onPress={handleCancelModalClose} />
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default Reservations;
