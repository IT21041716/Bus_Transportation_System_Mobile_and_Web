import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import View from "./images/view.png";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SmartCardRequest() {
  const [fullName, setFullName] = useState("");
  const [nic, setNIC] = useState("");
  const [dob, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [uId, setUID] = useState("112233445566778899");
  const navigate = useNavigate();

  const requestSamarCard = (e) => {
    if (fullName == "") {
      toast.error("Please enter full name");
    } else if (nic == "") {
      toast.error("Please enter nic");
    } else if (dob == "") {
      toast.error("Please enter date of birth");
    } else if (address == "") {
      toast.error("Please enter address");
    } else if (city == "") {
      toast.error("Please enter city");
    } else if (postalCode == "") {
      toast.error("Please enter postal code");
    } else if (
      fullName != "" &&
      nic != "" &&
      dob != "" &&
      address != "" &&
      city != "" &&
      postalCode != ""
    ) {
      const smartCard = {
        uId,
        fullName,
        nic,
        dob,
        address,
        city,
        postalCode,
      };

      axios
        .post("http://localhost:5005/smartcard/add", smartCard)
        .then(() => {
          toast.success("Successfully request for the smartcard!");
          navigate("/#");
        })
        .catch(() => {
          toast.error("Error in requesting smart card!");
        });
    }
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "#684bf6",
          height: "90px",
          borderRadius: "20px",
        }}
      >
        <h4
          style={{
            fontSize: "30px",
            textAlign: "center",
            paddingTop: "10px",
            color: "white",
          }}
        >
          Smart Card
        </h4>
        <h4 style={{ textAlign: "center", marginTop: "-10px" }}>Applay</h4>
      </div>
      <div
        style={{
          width: "60%",
          margin: "0 auto",
          padding: "10px",
          color: "blue",
          fontWeight: "bold",
        }}
      >
        <ul>
          <li>
            To request for a smart card, Rs.100.00 will be deducted from your
            account balance.
          </li>
          <li>
            Please topup your account if you have insufficient balanace for the
            request.
          </li>
        </ul>
      </div>
      <div className="row" style={{ widows: "70%", margin: "0 auto" }}>
        <div className="col">
          <Form
            style={{ width: "80%", margin: "0  auto" }}
            onSubmit={requestSamarCard}
          >
            <br />
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={3}>
                Full Name :
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  required
                  name="1"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={3}>
                NIC :
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  required
                  name="1"
                  onChange={(e) => setNIC(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={3}>
                Date of Birth :
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="date"
                  required
                  name="1"
                  onChange={(e) => setDOB(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={3}>
                Address :
              </Form.Label>
              <Col sm={9}>
                <textarea
                  rows={5}
                  cols={48}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={3}>
                City :
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  required
                  name="1"
                  onChange={(e) => setCity(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={3}>
                Postal Code :
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  required
                  name="1"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col>
                <Button type="submit" className="btn btn-primary">
                  Add
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
        <div className="col">
          <div
            class="card bg-dark text-white"
            style={{ width: "90%", padding: "10px" }}
          >
            <img class="card-img" src={View} alt="Card image" />
            <div class="card-img-overlay">
              <h5 class="card-title">Tap & Go . . . </h5>

              <p class="card-text" style={{ paddingTop: "250px" }}>
                * Rs.100.00 will be deducted from your account upon Smart Card
                Request
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
