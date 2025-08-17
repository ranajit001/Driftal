# Interface Monitoring Dashboard

A modern MERN stack web application to monitor HR and integration interfaces in real-time, featuring a futuristic glassmorphism UI and efficient API backend.

## Features

- **Dashboard Homepage**
  - Summary metrics (success/failure/warning)
  - Interactive charts (Line, Bar, Pie)
  - Real-time stats with date filters (Last Hour, Day, Week, Month, Custom range)
- **Live Interface Logs**
  - Paginated table of logs: Interface Name, Integration Key, Status, Message, Timestamp
  - Per-column filtering, advanced filter modal
  - Status tags with smart color coding
- **User Experience**
  - Fully responsive design with dark/light mode toggle
  - Glassmorphism & neon accents
  - Smooth transitions and hover effects
- **Performance**
  - Efficient backend API with pagination & filtering
  - Minimal, beginner-friendly file structure

---

## Getting Started

### 1. Clone the Repository
        git clone https://github.com/ranajit001/Driftal.git

### 2. Setup the Backend

1. Install dependencies:

    ```
    cd interface-monitoring-backend
    npm install
    ```

2. Create `.env` file:

    ```
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/interface_monitoring
    ```


3. Seed database with sample logs  & Start the backend server:

    ```
    npm run dev
    ```

    The backend runs at [http://localhost:5000](http://localhost:5000).

---

### 3. Setup the Frontend

1. Open a new terminal, then:

    ```
    cd interface-monitoring-dashboard
    npm install
    ```

2. Start the frontend development server:

    ```
    npm run dev
    ```

    The frontend runs at [http://localhost:5173/](http://localhost:5173/).

---

## API Endpoints

- **GET /api/dashboard/metrics?timeRange=day**  
  Returns dashboard metrics for a time range.

- **GET /api/dashboard/chart-data?timeRange=day**  
  Returns chart data for visualizations.

- **GET /api/logs?page=1&limit=20&status=success**  
  Paginated logs with filtering.

- **POST /api/logs**  
  Create new log entry (expects JSON body).

---

## Technology Stack

- **Frontend:** React (functional components, hooks), Tailwind CSS, Recharts
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Other:** CORS, dotenv, minimal REST API structure

---

## Project Structure Overview

```
interface-monitoring-dashboard/
├── src/
│ ├── components/ # Modular UI (Navbar, Sidebar, Cards, Table, etc.)
│ ├── hooks/ # Custom React hooks for data and theme
│ ├── pages/ # App pages (Dashboard)
│ ├── data/ # Mock data for development
│ ├── styles/ # Tailwind CSS config
│ └── utils/ # Utility functions

interface-monitoring-backend/
├── models/ # Mongoose schemas
├── routes/ # Express route handlers
├── utils/ # Database seed script
├── database.js # MongoDB connection
├── server.js # Express server entry
```
