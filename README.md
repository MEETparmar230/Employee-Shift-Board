# 🗓️ Shift Management System

A full-stack Shift Management System built with React, Node.js, Express, and MongoDB, featuring role-based access control, JWT authentication, and employee shift scheduling. 🚀

## Features

### 👤 Authentication & Authorization
- User signup & login
- JWT-based authentication (stored in HTTP-only cookies)
- Role-based access (admin, user)
- Protected routes using middleware

### 👨‍💼 Employee Management
- Employees stored separately
- Users linked to employees using MongoDB ObjectId
- Admin-controlled shift assignment

### 📅 Shift Management
**Admin can:**
- Create shifts
- View all shifts
- Delete shifts
- Filter shifts by date

**Users can:**
- View their own upcoming shift
- See shift date & timings

### 🛡️ Security
- Password hashing with bcrypt
- Secure cookies
- Centralized error handling

## 🧱 Tech Stack

**Frontend**
- React (Vite)
- Axios
- React Router
- Tailwind CSS
- React Hot Toast

**Backend**
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (JSON Web Tokens)
- Zod (input validation)

## 📂 Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── AuthContext.jsx
│   │   └── main.jsx
│   └── ...
├── server/
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── shiftController.js
│   │   └── adminController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Employee.js
│   │   └── Shift.js
│   ├── routes/
│   │   ├── userRouter.js
│   │   ├── shiftRouter.js
│   │   └── adminRouter.js
│   ├── lib/
│   │   ├── authMiddleware.js
│   │   ├── db.js
│   │   └── errHandler.js
│   └── server.js
```

## 🧾 Database Models

**User**
```javascript
{
  email: String,
  password: String,
  role: "admin" | "user",
  employeeId: ObjectId (ref: Employee)
}
```

**Employee**
```javascript
{
  name: String,
  employeeCode: Number,
  department: String
}
```

**Shift**
```javascript
{
  employeeId: ObjectId (ref: Employee),
  date: "YYYY-MM-DD",
  startTime: "HH:mm",
  endTime: "HH:mm"
}
```

## 🔐 Authentication Flow

1. User logs in
2. Server issues JWT in HTTP-only cookie
3. authCheck middleware: Verifies token & Attaches user info to req.user
4. Role-based access enforced in controllers

## 🌐 API Endpoints

### User Routes (/user)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /signup | Create user + employee |
| POST | /login | Login user |
| GET | /me | Get logged-in user |
| POST | /logout | Logout user |

### Shift Routes (/shifts)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /createShift | Admin | Create shift |
| GET | /getShifts | Admin | Get all shifts |
| DELETE | /delete/:id | Admin | Delete shift |
| GET | /my | User | Get user's upcoming shift |

## ⚙️ Environment Variables

**Backend (.env)**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/shift-db
JWT_SECRET=your_secret_key
CLIENT=http://localhost:5173
```

**Frontend (.env)**
```
VITE_SERVER=http://localhost:5000
```

## ▶️ Getting Started

### 1️⃣ Clone Repository
```bash
git clone https://github.com/MEETparmar230/Employee-Shift-Board.git
```

### 2️⃣ Backend Setup
```bash
cd server
npm install
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd client
npm install
npm run dev
```

## 🧪 Test Accounts

**Admin**
- Email: admin@example.com
- Password: Admin@123

**User**
- Email: user@example.com
- Password: User@123

## 🧠 Key Learnings

- Correct usage of MongoDB ObjectId references
- Avoid mixing UUIDs and ObjectIds
- JWT auth with cookies
- Role-based access control
- Clean REST API design

## 🔮 Future Improvements

- Shift history
- Notifications
- Pagination
- Calendar UI
- Admin dashboard analytics

## 👨‍💻 Author

Meet Web Developer | MERN Stack 💻
Passionate about scalable backend systems