import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Select } from "antd";
import ReservationService from "./services/reservation_service";
import moment from "moment";
const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingReservation, setEditingReservation] = useState(null);

  const reservationService = ReservationService.getInstance();

  const { Option } = Select;

  const columns = [
    {
      title: "Reservation ID",
      dataIndex: "_id",
      key: "id",
    },
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
      title: "Reserved To",
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
    form.resetFields();
    setEditingReservation(null);
    setModalVisible(true);
  };

  const handleEdit = (reservation) => {
    reservation.reservedDate = moment(reservation.reservedDate);
    setEditingReservation({
      ...reservation,
      reservedDate: moment(reservation.reservedDate),
    });
    console.log(editingReservation);
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

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Reservation
      </Button>
      <Table dataSource={reservations} columns={columns} rowKey="id" />

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
            name="reservedTo"
            label="Reserved To"
            rules={[{ required: true, message: "Please enter a value" }]}
          >
            <Input disabled={editingReservation} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Reservations;
