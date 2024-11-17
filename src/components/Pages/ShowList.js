import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

function ShowList() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    id: null,
    name: "",
    email: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const apiURL = "https://6728ac5f270bd0b97556b69e.mockapi.io/user"; // Replace with your API endpoint

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(apiURL);
    setData(response.data);
  };

  const handleShow = (item = { id: null, name: "", email: "" }) => {
    setIsEdit(!!item.id);
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (isEdit) {
      await axios.put(`${apiURL}/${currentItem.id}`, currentItem);
    } else {
      await axios.post(apiURL, currentItem);
    }
    fetchData();
    handleClose();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${apiURL}/${id}`);
    fetchData();
  };

  return (
    <div className="container">
      <h1>AJAX CRUD Example</h1>
      <Button variant="primary" onClick={() => handleShow()}>
        Add New Item
      </Button>
      <h2>Data List</h2>
      <ul className="list-group">
        {data.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {item.name} - {item.email}
            </span>
            <div>
              <Button variant="warning" onClick={() => handleShow(item)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(item.id)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Item" : "Add New Item"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control mb-2"
            value={currentItem.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="form-control"
            value={currentItem.email}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ShowList;
