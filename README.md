# TODO CRUD Application

A simple TODO application built using **React** for the frontend, **FastAPI** for the backend, and **MongoDB** as the database. This project demonstrates full-stack CRUD functionality with a modern tech stack.

---

## Features

* ✅ Create, Read, Update, Delete TODO items
* ⚛️ React frontend with Axios for API calls
* 🚀 FastAPI backend with Pydantic schemas
* 🍃 MongoDB as database (via Motor async driver)
* 🌐 CORS-enabled backend for local frontend integration

---

## 1. Project Structure

```
TODO-CRUD-Application/
├── backend/
│   ├── main.py
│   ├── models.py
│   └── database.py
├── frontend/
│   ├── my-app/
│   │   ├── src/
│   │   │   ├── App.js
│   │   │   ├── components/
│   │   │   └── services/
├── README.md
└── LICENSE
```

---

## 2. Backend Setup (FastAPI + MongoDB)

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Create and activate virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   ```

3. **Install dependencies**

   ```bash
   pip install fastapi uvicorn motor pydantic
   ```

4. **Run FastAPI backend**

   ```bash
   uvicorn main:app --reload
   ```

5. **API will be available at:**

   ```
   http://localhost:8000
   ```

---

## 3. Frontend Setup (React)

1. **Navigate to the frontend directory**

   ```bash
   cd my-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the React development server**

   ```bash
   npm start
   ```

4. **Frontend will be running at:**

   ```
   http://localhost:3000
   ```

---

## 4. Environment Variables

> If your backend is hosted or MongoDB is deployed remotely, update the URLs accordingly.

Example `.env` file for backend:

```ini
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=todo_db
```

---

## 5. MongoDB Setup

* Make sure MongoDB is running on your machine or use a cloud MongoDB provider like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
* Default local URI:

  ```
  mongodb://localhost:27017
  ```
* Collection:

  ```
  todos
  ```

---

## 6. Sample API Endpoints

| Method | Endpoint      | Description          |
| ------ | ------------- | -------------------- |
| GET    | `/todos`      | Get all TODOs        |
| POST   | `/todos`      | Create new TODO      |
| PUT    | `/todos/{id}` | Update existing TODO |
| DELETE | `/todos/{id}` | Delete TODO          |

---

## 7. Example Data

```json
{
  "title": "Finish homework",
  "description": "Complete math and science assignments",
  "completed": false
}
```

---

## 8. Screenshots (Optional)

> You can add screenshots or GIFs of your app interface here.

---

## 9. Future Improvements

* ✅ Add user authentication
* ✅ Deploy backend and frontend (e.g., via Vercel + Railway)
* ✅ Add unit/integration tests
* ✅ Implement due dates and filters

---

## 10. License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 11. Author

👤 **ChuLiYu**

Feel free to submit issues or pull requests to improve the project!
