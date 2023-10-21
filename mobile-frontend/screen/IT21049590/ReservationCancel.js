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
import axios from 'axios';
import { PlusOutlined, EditOutlined, StopOutlined } from '@ant-design/icons';
import { Tag } from 'react-native-tag-input'; // You may need to use a third-party library for tags

const ReservationCancel = () => {
  const [cancelRequests, setCancelRequests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCancelRequest, setEditingCancelRequest] = useState(null);
  const API_URL = 'http://localhost:5005/journey/';

  const acceptCancellation = (data) => {
    console.log(data);
    let model = {
      createdBy: data.createdBy,
      reservedDate: data.reservedDate,
      reason: data.reason,
      status: 'Cancelled',
      location: data.location,
      price: data.price,
    };

    axios.put(API_URL + data._id, model).then((response) => {
      getJourneys();
    });
    console.log('Hi ', model.price);
    axios.post(API_URL1, model).then((response) => {
      getJourneys();
    });
  };

  const rejectCancellation = (data) => {
    let model = {
      createdBy: data.createdBy,
      reservedDate: data.reservedDate,
      reason: data.reason,
      status: 'Rejected',
      location: data.location,
      price: data.price,
    };
    axios.put(API_URL + data._id, model).then((response) => {
      getJourneys();
    });
  };

  const columns = [
    {
      title: 'Reserved Date',
      dataIndex: 'reservedDate',
      key: '0',
      align: 'center',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: '1',
      align: 'center',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: '2',
      align: 'center',
    },
    {
      title: 'Status',
      render: (data) => {
        if (data == 'Pending') {
          return <Tag color="processing">Pending Cancellation</Tag>;
        } else if (data == 'Active') {
          return <Tag color="success">Active</Tag>;
        } else if (data == 'rejected') {
          return <Tag color="error">Rejected</Tag>;
        } else if (data == 'cancelled') {
          return <Tag color="warning">Cancelled</Tag>;
        }
      },
      dataIndex: 'status',
      key: '3',
      align: 'center',
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: '4',
      align: 'center',
    },
    {
      title: 'Actions',

      render: (item) => {
        return (
          <View>
            <View>
              <Button
                title="Accept"
                onPress={() => acceptCancellation(item)}
                disabled={
                  item.status === 'Rejected' || item.status === 'Cancelled'
                }
                style={{
                  backgroundColor:
                    item.status === 'Rejected' ||
                    item.status === 'Cancelled'
                      ? '#d3d3d3'
                      : '#00cc00',
                  borderColor: '#00cc00',
                }}
              />
            </View>
            <View>
              <Button
                title="Reject"
                onPress={() => rejectCancellation(item)}
                disabled={
                  item.status === 'Rejected' || item.status === 'Cancelled'
                }
              />
            </View>
          </View>
        );
      },
      key: '5',
      align: 'center',
    },
  ];

  const [tableData, setTableData] = useState([]);

  const getJourneys = () => {
    axios
      .get(API_URL)
      .then((response) => {
        console.log(response.data);
        const temp = response.data.filter((item) => {
          return item.status == 'Pending';
        });
        setTableData(temp);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getJourneys();
  }, []);

  return (
    <View>
      {tableData.map((item, index) => (
        <View key={index}>
          <Text>Reserved Date: {item.reservedDate}</Text>
          <Text>Location: {item.location}</Text>
          <Text>Price: {item.price}</Text>
          <Tag style={{ backgroundColor: 'lightgray' }}>
            {item.status}
          </Tag>
          <Text>Reason: {item.reason}</Text>
          <View>
            <Button
              title="Accept"
              onPress={() => acceptCancellation(item)}
              disabled={
                item.status === 'Rejected' || item.status === 'Cancelled'
              }
              style={{
                backgroundColor:
                  item.status === 'Rejected' ||
                  item.status === 'Cancelled'
                    ? '#d3d3d3'
                    : '#00cc00',
              }}
            />
          </View>
          <View>
            <Button
              title="Reject"
              onPress={() => rejectCancellation(item)}
              disabled={
                item.status === 'Rejected' || item.status === 'Cancelled'
              }
            />
          </View>
        </View>
      ))}

      <Modal
        title={
          editingCancelRequest
            ? 'Edit Cancellation Request'
            : 'Add Cancellation Request'
        }
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <View>
          <Text>Status</Text>
          <Picker selectedValue={editingCancelRequest?.status}>
            <Picker.Item label="Accepted" value="accepted" />
            <Picker.Item label="Pending" value="pending" />
            <Picker.Item label="Rejected" value="rejected" />
          </Picker>
        </View>
      </Modal>
    </View>
  );
};

export default ReservationCancel;
