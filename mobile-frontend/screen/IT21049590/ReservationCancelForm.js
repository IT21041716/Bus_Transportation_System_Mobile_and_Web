import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ReservationCancelForm = ({ reservationId, onCancel }) => {
  const [reason, setReason] = useState('');
  const [state, setState] = useState('pending');

  const handleCancel = async () => {
    try {
      // Make an axios request here to cancel the reservation, similar to your original code.

      // Handle response as needed, e.g., show success message or navigate to a different page
      console.log('Reservation canceled successfully');

      // Close the modal after successful cancellation
      onCancel();
    } catch (error) {
      console.error('Error canceling reservation:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <View>
      <View style={{ marginBottom: 20 }}>
        <Text>Cancellation Reason</Text>
        <TextInput
          value={reason}
          onChangeText={(text) => setReason(text)}
          placeholder="Enter Cancellation Reason"
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text>Cancellation State</Text>
        <Picker
          selectedValue={state}
          onValueChange={(itemValue) => setState(itemValue)}
        >
          <Picker.Item label="Accepted" value="accepted" />
          <Picker.Item label="Pending" value="pending" />
          <Picker.Item label="Rejected" value="rejected" />
        </Picker>
      </View>

      <Button title="Cancel Reservation" onPress={handleCancel} />
    </View>
  );
};

export default ReservationCancelForm;
