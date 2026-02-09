# HRMS

## Project Overview
HRMS is a lightweight full-stack web app for managing employee records and daily attendance. It provides a simple admin interface to add and delete employees, mark attendance with a date and status, and view attendance history per employee.

## Tech Stack
- Frontend: React (Vite), Axios, TailwindCSS
- Backend: FastAPI, Motor (MongoDB), Pydantic
- Database: MongoDB

## Steps to Run Locally
### Backend
1) Open a terminal and go to the backend folder:
```
cd be
```
2) Create and activate a virtual environment, then install dependencies:
```
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```
3) Set the MongoDB connection string in .env:
```
MONGO_URI=your-mongodb-connection-string
```
4) Start the API:
```
uvicorn main:app --reload --env-file .env
```
The API runs at http://127.0.0.1:8000.

### Frontend
1) Open a new terminal and go to the frontend folder:
```
cd fe
```
2) Install dependencies and start the dev server:
```
npm install
npm run dev
```
The app runs at http://localhost:5173.

## Assumptions / Limitations
- Single admin user; no authentication.
- Attendance is stored per employee and date; no advanced reports or filters.
- MongoDB must be reachable via the provided MONGO_URI.
- For production, update the frontend API base URL or use environment variables.
