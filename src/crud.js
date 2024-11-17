import React, { useState, useEffect } from "react";

const apiUrl = "https://6728ac5f270bd0b97556b69e.mockapi.io/user";

function CRUDPage() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // 데이터 로드
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(apiUrl);
    const result = await response.json();
    setData(result);
  };

  const handleAdd = async () => {
    if (name && email) {
      await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      fetchData();
      setName("");
      setEmail("");
    }
  };

  const handleDelete = async (id) => {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchData();
  };

  const handleEdit = (id, currentName, currentEmail) => {
    setIsEditMode(true);
    setEditId(id);
    setName(currentName);
    setEmail(currentEmail);
  };

  const handleUpdate = async () => {
    if (name && email) {
      await fetch(`${apiUrl}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      fetchData();
      setIsEditMode(false);
      setEditId(null);
      setName("");
      setEmail("");
    }
  };

  return (
    <div className="container">
      <h1>CRUD Example</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {isEditMode ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <button onClick={handleAdd}>Add</button>
      )}

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name} ({item.email})
            <button onClick={() => handleEdit(item.id, item.name, item.email)}>
              Edit
            </button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CRUDPage;
