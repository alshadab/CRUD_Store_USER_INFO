import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ListIcon from "@mui/icons-material/List";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
//import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useNavigate } from "react-router-dom";

import("./Box.css");

const Box = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  let i = 1;
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");

  const URL = process.env.REACT_APP_APP_URL;
  //get user data
  const getUser = () => {
    fetch(`${URL}/student/get`)
      .then((res) => res.json())
      .then((data) => setData(data));
  };
  useEffect(() => {
    getUser();
  }, []);

  //delete user
  const handleDelete = (id) => {
    fetch(`${URL}/student/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("Successfully Deleted student");
          getUser();
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  //create student
  const handleCreate = () => {
    const formInfo = {
      name,
      email,
      phone,
      address,
    };
    let url = `${URL}/student/create`;
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formInfo),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          alert("Successfully Created student");
          getUser();
          setModalShow(false);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  //Update User
  const update = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <Container className="main">
      <Button
        className="bttn"
        onClick={() => {
          setModalShow(true);
        }}
        variant="success"
      >
        <PersonAddIcon />
        New User
      </Button>
      <div className="info">
        <p className="tag">
          <ListIcon /> Index
        </p>
        <p className="tag">
          <BadgeIcon /> Name
        </p>
        <p className="tag">
          <EmailIcon /> Email
        </p>
        <p className="tag">
          <PhoneIcon /> Phone
        </p>
        <p className="tag">
          <HomeIcon /> Address
        </p>
        <p className="tag">
          <ReceiptLongIcon /> Actions
        </p>
      </div>
      <div className="box">
        {data.map((data) => (
          <div key={data._id} className="inf">
            <p>{i++}</p>
            <p>{data.name}</p>
            <p>{data.email}</p>
            <p>{data.phone}</p>
            <p>{data.address}</p>
            <div className="contents">
              <EditIcon
                onClick={() => update(data._id)}
                style={{ color: "#FFF6BD" }}
              />{" "}
              <DeleteIcon
                onClick={() => handleDelete(data._id)}
                style={{ color: "red" }}
              />
            </div>
          </div>
        ))}
      </div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="contain">
            <Form.Group className="mb-3 group" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
              />
            </Form.Group>
            <Form.Group className="mb-3 group" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => setMail(e.target.value)}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3 group" controlId="formBasicEmail">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                placeholder="Phone"
              />
            </Form.Group>
            <Form.Group className="mb-3 group" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Address"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            color="success"
            onClick={() => setModalShow(false)}
          >
            Close
          </Button>
          <Button
            variant="warning"
            color="success"
            type="submit"
            onClick={handleCreate}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Box;
