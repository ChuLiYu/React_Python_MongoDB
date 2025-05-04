import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [editId, setEditId] = useState(null);  // 編輯的 id

  // 從 FastAPI 讀取資料
  useEffect(() => {
    fetch('http://localhost:8000/todos')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  // 新增資料
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: key, status: value === 'true' }), // 根據狀態轉換
    });
    setKey('');
    setValue('');
    // 重新抓取資料
    fetchData();
  };

  // 修改資料
  const handleUpdate = async (id) => {
    const newTitle = prompt("Enter new title: ");
    const newStatus = prompt("Enter new status (true/false): ");

    await fetch(`http://localhost:8000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTitle, status: newStatus === 'true' }),
    });

    fetchData();
  };

  // 刪除資料
  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/todos/${id}`, {
      method: 'DELETE',
    });
    fetchData();
  };

  // 重新抓取資料
  const fetchData = () => {
    fetch('http://localhost:8000/todos')
      .then(response => response.json())
      .then(data => setData(data));
  };

  return (
    <div className="App">
      <h1>MongoDB Data</h1>

      <div>
        <h2>Fetched Data:</h2>
        {data && data.length > 0 ? (
          <ul>
            {data.map((todo) => (
              <li key={todo.id}>
                <span>{todo.title} - {todo.status ? 'Completed' : 'Pending'}</span>
                <button onClick={() => handleUpdate(todo.id)}>Edit</button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No data available</p>
        )}
      </div>

      <h2>Add Data:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Status (true/false)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Add Data</button>
      </form>
    </div>
  );
}

export default App;
