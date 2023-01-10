import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import "./Update.css";
const Update = () => {
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  //get data
  const viewData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/student/get/${id}`);
      setName(res.data.name);
      setMail(res.data.email);
      setPhone(res.data.phone);
      setAddress(res.data.address);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    viewData();
  }, []);

  const updateUser = async () => {
    const formInfo = {
      name,
      email,
      phone,
      address,
    };

    try {
      const res = await axios.patch(
        `http://localhost:5000/student/update/${id}`,
        formInfo
      );
      if (res.status === 200) {
        alert("Successfully Updated student");
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="updateForm">
      <Container>
        <Form className="containUpdate">
          <Form.Group className="mb-3 group" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
          </Form.Group>
          <Form.Group className="mb-3 group" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setMail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3 group" controlId="formBasicEmail">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              placeholder="Phone"
            />
          </Form.Group>
          <Form.Group className="mb-3 group" controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Address"
            />
          </Form.Group>
          <Button
            variant="success"
            color="success"
            type="submit"
            onClick={updateUser}
          >
            Update
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            variant="danger"
            color="success"
            type="submit"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Update;
