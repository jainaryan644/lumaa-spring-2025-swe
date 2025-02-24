# Task Management App (Full-Stack)

## Overview
This is a **full-stack task management application** built with:
- **Frontend**: React + TypeScript
- **Backend**: NestJS + Node.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Token) for secure login

### **Features**
**User Authentication** (Register, Login)  
**Task Management** (Create, Read, Update, Delete)  
**Protected Routes** (Only authenticated users can access tasks)  
**Persistent Sessions** (JWT stored in `localStorage`)  
**Minimal & Functional UI**  

---

## **Setup Instructions**
### ** 1. Clone the Repository**
```sh
git clone <your-repo-link>
cd <your-repo-folder>
```
### **Backend Setup**
```sh
cd backend
npm install
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/taskmanager
JWT_SECRET=supersecretkey
PORT=3000

npm run migration:run
npm run start
The server should now be running at:
http://localhost:3000
```

### **Frontend Setup**

1. Navigate to Frontend Folder
```sh
bash
Copy
Edit
cd frontend
```
2. Install Dependencies
```sh
bash
Copy
Edit
npm install
```
3. Configure API URL (Create .env in frontend/)
```sh
env
Copy
Edit
REACT_APP_API_BASE_URL=http://localhost:3000
```
4. Start Frontend
```sh
bash
Copy
Edit
npm start
Frontend will run at http://localhost:3001
```
5. Connecting Frontend & Backend
Frontend communicates with backend using REST API calls.
See the API Documentation section below for details.

Ensure both frontend and backend are running at the same time:
```sh
bash
Copy
Edit
# In one terminal (Backend)
cd backend
npm run start

# In another terminal (Frontend)
cd frontend
npm start
```
## **API Documentation**

Authentication
| Method | Endpoint         | Description      | Body Example |
|--------|-----------------|------------------|-------------|
| POST   | /auth/register  | Register a user | `{ "username": "user", "password": "pass" }` |
| POST   | /auth/login     | Login & get token | `{ "username": "user", "password": "pass" }` |


Tasks
| Method | Endpoint     | Description  | Headers Example |
|--------|-------------|--------------|----------------|
| GET    | /tasks      | Get all tasks | `{ "Authorization": "Bearer token" }` |
| POST   | /tasks      | Create task   | `{ "Authorization": "Bearer token" }` |
| PUT    | /tasks/:id  | Update task   | `{ "Authorization": "Bearer token" }` |
| DELETE | /tasks/:id  | Delete task   | `{ "Authorization": "Bearer token" }` |

