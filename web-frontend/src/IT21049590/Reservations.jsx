// Reservations.jsx

import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Select } from "antd";
import ReservationService from "./services/reservation_service";
import moment from "moment";
import ReservationCancelForm from "./ReservationCancelForm"; // Import the ReservationCancelForm component
import { Link } from "react-router-dom";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false); // State to control the cancellation form modal
  const [form] = Form.useForm();
  const [editingReservation, setEditingReservation] = useState(null);

  const reservationService = ReservationService.getInstance();

  const { Option } = Select;

  const columns = [
  
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Reserved Date",
      dataIndex: "reservedDate",
      key: "reservedDate",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Location",
      dataIndex: "reservedTo",
      key: "reservedTo",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",

      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button danger onClick={() => showDeleteConfirm(record._id)}>
            Delete
          </Button>
          <Button type="primary" onClick={() => showCancelModal(record._id)}>
            Cancel
          </Button>
        </>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const reservationsData = await reservationService.getReservations();
      setReservations(reservationsData);
    } catch (error) {
      console.error("Error fetching reservations:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditingReservation(null);
    setModalVisible(true);
  };

  const handleEdit = (reservation) => {
    setEditingReservation({
      ...reservation,
      reservedDate: moment(reservation.reservedDate),
    });
    form.setFieldsValue(editingReservation);
    setModalVisible(true);
  };

  const showDeleteConfirm = (reservationId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this reservation?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(reservationId),
    });
  };

  const handleDelete = async (reservationId) => {
    try {
      await reservationService.deleteReservation(reservationId);
      fetchData();
    } catch (error) {
      console.error("Error deleting reservation:", error.message);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingReservation) {
        await reservationService.updateReservation(
          editingReservation._id,
          values
        );
      } else {
        await reservationService.createReservation(values);
      }
      setModalVisible(false);
      fetchData();
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const showCancelModal = (reservationId) => {
    setEditingReservation({ _id: reservationId });
    console.log("id ", reservationId);
    setCancelModalVisible(true);
  };

  const handleCancelModalClose = () => {
    setCancelModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Reservation
      </Button>
      <Table dataSource={reservations} columns={columns} rowKey="id" />

      {/* Add/Edit Reservation Modal */}
      <Modal
        title={editingReservation ? "Edit Reservation" : "Add Reservation"}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="createdBy"
            label="Created By"
            rules={[{ required: true, message: "Please enter a value" }]}
          >
            <Input disabled={editingReservation} />
          </Form.Item>
          <Form.Item
            name="reservedDate"
            label="Reserved Date"
            rules={[{ required: true, message: "Please enter a value" }]}
          >
            <DatePicker
              disabled={editingReservation}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please enter a value" }]}
          >
            <Select>
              <Option value="active">Active</Option>
              <Option value="not-active">Not Active</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="Location"
            label="Location"
            rules={[{ required: true, message: "Please enter a value" }]}
          >
            <Input disabled={editingReservation} />
          </Form.Item>
        </Form>
        {/* ... (existing form) */}
      </Modal>

      {/* Cancel Reservation Modal */}
      <Modal
        title="Cancel Reservation"
        visible={cancelModalVisible}
        onCancel={handleCancelModalClose}
        footer={null}
      >
        <ReservationCancelForm
          reservationId={editingReservation ? editingReservation._id : null}
          onCancel={handleCancelModalClose}
        />
      </Modal>
    </div>
  );
};

export default Reservations;
