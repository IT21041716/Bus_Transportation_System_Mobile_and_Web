import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import ReservationCancelService from "./services/reservation_cancel_service";

const ReservationCancel = () => {
  const [cancelRequests, setCancelRequests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCancelRequest, setEditingCancelRequest] = useState(null);

  const reservationCancelService = ReservationCancelService.getInstance();

  const { Option } = Select;

  const columns = [
    {
      title: "Request ID",
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Reservation ID",
      dataIndex: "reservationId",
      key: "reservationId",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Status",
      dataIndex: "state",
      key: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => showDeleteConfirm(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const cancelRequestsData =
        await reservationCancelService.getReservationCancels();
      setCancelRequests(cancelRequestsData);
    } catch (error) {
      console.error("Error fetching cancellation requests:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    form.resetFields();
    setEditingCancelRequest(null);
    setModalVisible(true);
  };

  const handleEdit = (cancelRequest) => {
    form.setFieldsValue(cancelRequest);
    setEditingCancelRequest(cancelRequest);
    setModalVisible(true);
  };

  const showDeleteConfirm = (cancelRequestId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this cancellation request?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(cancelRequestId),
    });
  };

  const handleDelete = async (cancelRequestId) => {
    try {
      await reservationCancelService.deleteReservationCancel(cancelRequestId);
      fetchData();
    } catch (error) {
      console.error("Error deleting cancellation request:", error.message);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingCancelRequest) {
        await reservationCancelService.updateReservationCancel(
          editingCancelRequest._id,
          values
        );
      } else {
        await reservationCancelService.createCancelRequest(values);
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
      <Table dataSource={cancelRequests} columns={columns} rowKey="id" />

      <Modal
        title={
          editingCancelRequest
            ? "Edit Cancellation Request"
            : "Add Cancellation Request"
        }
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please enter a value" }]}
          >
            <Select>
              <Option value="accepted">Accepted</Option>
              <Option value="pending">Pending</Option>
              <Option value="rejected">Rejected</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ReservationCancel;
