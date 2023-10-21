import { Col, Form, Modal, Row, Table, Tag, Tooltip } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { render } from "react-dom";
import { useParams } from "react-router-dom";
import { PlusOutlined, EditOutlined, StopOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";

const UserJourney = () => {
  const { UID } = useParams();
  const API_URL = "http://localhost:5005/journey/";
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [tableData, setTableData] = useState([]);

  const getJourneys = () => {
    axios
      .get(API_URL + "user/" + UID)
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {});
  };
  const saveJourney = async () => {
    let formdata = await form.validateFields();

    console.log(formdata);
    let model = {
      createdBy: UID,
      reservedDate: moment(formdata.date).format("yyyy-MM-DD"),
      reason: "",
      status: "Active",
      location: formdata.location,
      price: formdata.price,
    };
    console.log("model", model);
    axios.post(API_URL, model).then((response) => {
      getJourneys();
      setAddModal(false);
    });
  };

  const updateJourney = async () => {
    let formdata = await formUpdate.validateFields();

    console.log(formdata);
    let model = {
      createdBy: UID,
      reservedDate: moment(formdata.date).format("yyyy-MM-DD"),
      reason: "",
      status: "Active",
      location: formdata.location,
      price: formdata.price,
    };
    console.log("model", model);
    axios.put(API_URL, model).then((response) => {
      getJourneys();
      setUpdateModal(false);
    });
  };
  const [updateID, setUpdateID] = useState();
  const openCancelModal = (data) => {
    setUpdateID(data._id);
    setCancelModal(true);
  };
  const cancelJourney = async () => {
    let formdata = await formCancel.validateFields();
    console.log(formdata);
    const listItem = tableData.filter((e) => {
      return e._id == updateID;
    });

    let model = {
      createdBy: UID,
      reservedDate: moment(listItem.reservedDate).format("yyyy-MM-DD"),
      reason: formdata.reason,
      status: "Pending",
      location: listItem.location,
      price: listItem.price,
    };

    axios.put(API_URL + updateID, model).then((response) => {
      getJourneys();
      setCancelModal(false);
    });
  };
  useEffect(() => {
    getJourneys();
  });

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
        } else if (data == "Rejected") {
          return <Tag color="error">Rejected</Tag>;
        } else if (data == "Cancelled") {
          return <Tag color="warning">Cancelled</Tag>;
        }
      },
      dataIndex: "status",
      key: "3",
      align: "center",
    },
    // {
    //   title: "Reason",
    //   dataIndex: "reason",
    //   key: "4",
    //   align: "center",
    // },
    {
      title: () => {
        return (
          <Tooltip title="Add">
            <PlusOutlined
              onClick={() => {
                setAddModal(true);
              }}
            />
          </Tooltip>
        );
      },

      render: (item) => {
        return (
          <table>
            <tr>
              <td>
                <Tooltip title="Update">
                  <EditOutlined
                    onClick={
                      item.status == "Pending" || item.status == "Cancelled"
                        ? () => {}
                        : () => {
                            openUpdateModal(item);
                          }
                    }
                  />
                </Tooltip>
              </td>
              <td>
                <Tooltip title="Cancel">
                  <StopOutlined
                    onClick={
                      item.status == "Pending" || item.status == "Cancelled"
                        ? () => {}
                        : () => {
                            openCancelModal(item);
                          }
                    }
                  />
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
  const locations = [
    {
      name: "Kurunagala - Polgahawela",
      price: "100",
    },
    {
      name: "Polgahawela - Meerigama",
      price: "200",
    },

    {
      name: "Veyangoda - Meerigama",
      price: "300",
    },
    {
      name: "Gampaha - Meerigama",
      price: "500",
    },
    {
      name: "Dematagoda - Gampaha",
      price: "800",
    },
    {
      name: "Maradana - Gampaha",
      price: "900",
    },
    {
      name: "Colombo Fort -Veyangoda",
      price: "1000",
    },
    {
      name: "Slave Island - Galle",
      price: "2000",
    },
  ];
  const [form] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const [formCancel] = Form.useForm();
  const onChangeAddModalLocation = (value) => {
    const temp = locations.find((e) => {
      return e.name === value;
    });
    console.log(temp.price);
    form.setFieldValue("price", temp.price);
  };
  const onChangeAddModalLocationUpdate = (value) => {
    const temp = locations.find((e) => {
      return e.name === value;
    });
    console.log(temp.price);
    formUpdate.setFieldValue("price", temp.price);
  };
  const openUpdateModal = (data) => {
    console.log(data);
    setUpdateModal(true);
    formUpdate.setFieldValue("location", data.location);
    formUpdate.setFieldValue("date", data.reservedDate);
    formUpdate.setFieldValue("price", data.price);
  };
  return (
    <Fragment>
      <Modal
        title="Add New Journey"
        centered
        open={addModal}
        width={800}
        onOk={() => saveJourney()}
        onCancel={() => setAddModal(false)}
      >
        <Form form={form}>
          <Row>
            <Col md={24}>
              <div className="Form-group">
                <label>Location</label>
                <Form.Item name="location">
                  <select
                    className="form-select"
                    onChange={(e) => {
                      onChangeAddModalLocation(e.target.value);
                    }}
                  >
                    {locations.map((item) => {
                      return <option value={item.name}>{item.name}</option>;
                    })}
                  </select>
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <div className="Form-group">
                <label>Date</label>
                <Form.Item name="date">
                  <input className="form-control" type="date" />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <div className="form-group">
                <label>Price</label>
                <Form.Item name="price">
                  <input className="form-control" disabled type="number" />
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        title="Update Journey"
        centered
        open={updateModal}
        width={800}
        onOk={() => updateJourney()}
        onCancel={() => setUpdateModal(false)}
      >
        <Form form={formUpdate}>
          <Row>
            <Col md={24}>
              <div className="form-group">
                <label>Location</label>
                <Form.Item name="location">
                  <select
                    className="form-select"
                    onChange={(e) => {
                      onChangeAddModalLocationUpdate(e.target.value);
                    }}
                  >
                    {locations.map((item) => {
                      return <option value={item.name}>{item.name}</option>;
                    })}
                  </select>
                </Form.Item>
              </div>
            </Col>
            <Row>
              <Col md={24}>
                <div className="Form-group">
                  <label>Date</label>
                  <Form.Item name="date">
                    <input className="form-control" type="date" />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Row>
          <Row>
            <Col md={24}>
              <div className="form-group">
                <label>Price</label>
                <Form.Item name="price">
                  <input disabled className="form-control" type="number" />
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        title="Why are you cancel this ?"
        centered
        open={cancelModal}
        onOk={() => cancelJourney()}
        onCancel={() => setCancelModal(false)}
      >
        <Form form={formCancel}>
          <Form.Item name="reason">
            <div className="form-group">
              <label>Reason</label>
              <input className="form-control" type="text" />
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <Row className="mt-3">
        <Col md={8}></Col>
        <Col md={8}>
          <h1 style={{ textAlign: "center" }}>Your Journeys</h1>
        </Col>
        <Col md={8}></Col>
      </Row>
      <br></br>
      <br></br>
      <br></br>
      <Row className="mt-4">
        <Col md={6}></Col>
        <Col md={12}>
          <Table
            columns={columns}
            dataSource={tableData}
            rowKey={"_id"}
            pagination={{ pageSize: 12 }}
          />
        </Col>
        <Col md={6}></Col>
      </Row>
    </Fragment>
  );
};

export default UserJourney;
