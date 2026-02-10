# MERN Agent Task Distributor

This is a MERN stack application built as part of a machine test.  
The application allows an admin to manage agents, upload CSV/Excel files, and distribute records equally among agents.

---

## Features

- Admin login with JWT authentication
- Agent creation, listing, and deletion
- Upload CSV / Excel files (`.csv`, `.xls`, `.xlsx`)
- Validate uploaded file structure
- Automatically distribute records equally among 5 agents
- Store distributed records in MongoDB
- View agent-wise distributed records
- Clean and responsive UI built with React and Tailwind CSS

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT
- **File Handling:** Multer, csv-parser, xlsx

---

## Project Structure

```
mern-agent-task-distributor/
├── backend/
│   ├── src/
│   ├── uploads/
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
└── README.md
```

---

## Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher)
- npm
- MongoDB Atlas account

---

## Backend Setup

1. Go to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start backend server:

```bash
npm run dev
```

5. Seed Admin User

Run this once to create the admin user:

```bash
node src/seedAdmin.js
```

### Admin Credentials

- Email: `admin@example.com`
- Password: `Admin@123`

---

## Frontend Setup

1. Go to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start frontend:

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## How the System Works

1. Admin logs in
2. Admin creates at least 5 agents
3. Admin uploads a CSV/Excel file with:
   - FirstName
   - Phone
   - Notes
4. Records are distributed equally among 5 agents
5. Distributed records can be viewed agent-wise from the dashboard

---

## Notes

- Upload is blocked unless at least 5 agents exist
- Invalid file formats or missing fields are rejected
- All protected routes require admin authentication

---

## Demo Video

https://drive.google.com/file/d/1rZiJpHKMqw6jOmkMmb3se7GJfsCg5ZQv/view?usp=sharing

---

## Author

Chandra Shekhar Verma
