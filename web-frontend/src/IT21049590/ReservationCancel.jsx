import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, Tooltip, Tag } from "antd";
import ReservationCancelService from "./services/reservation_cancel_service";
import axios from "axios";
import { PlusOutlined, EditOutlined, StopOutlined } from "@ant-design/icons";
const ReservationCancel = () => {
  const [cancelRequests, setCancelRequests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCancelRequest, setEditingCancelRequest] = useState(null);
  const API_URL = "http://localhost:5005/journey/";
  // const reservationCancelService = ReservationCancelService.getInstance();
  const acceptCancellation = (data) => {
    console.log(data);
    let model = {
      createdBy: data.createdBy,
      reservedDate: data.reservedDate,
      reason: data.reason,
      status: "Cancelled",
      location: data.location,
      price: data.price,
    };

    axios.put(API_URL + data._id, model).then((response) => {
      getJourneys();
    });
  };
  const rejectCancellation = (data) => {
    let model = {
      createdBy: data.createdBy,
      reservedDate: data.reservedDate,
      reason: data.reason,
      status: "Rejected",
      location: data.location,
      price: data.price,
    };
    axios.put(API_URL + data._id, model).then((response) => {
      getJourneys();
    });
  };
  const { Option } = Select;

  const columns = [
    {
      title: "Reserved Date",
      dataIndex: "reservedDate",
      key: "0",
      align: "center",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "1",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "2",
      align: "center",
    },
    {
      title: "Status",
      render: (data) => {
        if (data == "Pending") {
          return <Tag color="processing">Pending Cancellation</Tag>;
        } else if (data == "Active") {
          return <Tag color="success">Active</Tag>;
        } else if (data == "rejected") {
          return <Tag color="error">Rejected</Tag>;
        } else if (data == "cancelled") {
          return <Tag color="warning">Cancelled</Tag>;
        }
      },
      dataIndex: "status",
      key: "3",
      align: "center",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "4",
      align: "center",
    },
    {
      title: "Actions",

      render: (item) => {
        return (
          <table>
            <tr>
              <td>
                <Tooltip title="Update">
                  <Button
                    type="primary"
                    onClick={
                      item.status === "Rejected" || item.status === "Cancelled"
                        ? () => {}
                        : () => acceptCancellation(item)
                    }
                    style={{
                      backgroundColor:
                        item.status === "Rejected" ||
                        item.status === "Cancelled"
                          ? "#d3d3d3"
                          : "#00cc00",
                      borderColor: "#00cc00",
                      color: "white",
                    }}
                  >
                    Accept
                  </Button>
                </Tooltip>
              </td>
              <td>
                <Tooltip title="Cancel">
                  <Button
                    danger
                    onClick={
                      item.status === "Rejected" || item.status === "Cancelled"
                        ? () => {}
                        : () => rejectCancellation(item)
                    }
                  >
                    Reject
                  </Button>
                </Tooltip>
              </td>
            </tr>
          </table>
        );
      },
      key: "5",
      align: "center",
    },
  ];

  const [tableData, setTableData] = useState([]);

  const getJourneys = () => {
    axios
      .get(API_URL)
      .then((response) => {
        console.log(response.data);
        const temp = response.data.filter((item) => {
          return item.status == "Pending";
        });
        setTableData(temp);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getJourneys();
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
      <Table dataSource={tableData} columns={columns} rowKey="id" />

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
