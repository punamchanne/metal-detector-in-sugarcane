# Metal Detector in Sugarcane - MERN Stack Project

A comprehensive IoT-enabled web application for real-time metal detection in sugarcane processing.

## 🚀 Features

- **Real-time Monitoring**: Dashboard with live charts and system health status.
- **Alert System**: Instant notifications for ferrous/non-ferrous metal detection.
- **Secure Authentication**: JWT-based login/register with secure password hashing.
- **Responsive Design**: Mobile-friendly landing page and dashboard.
- **Reporting**: Automated PDF report generation (mockup) and historical data logs.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Recharts, Lucide Icons.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose.
- **Authentication**: JSON Web Token (JWT), BCrypt.js.

## 📂 Project Structure

```
/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages (Landing, Dashboard, Auth)
│   │   ├── services/       # API integration
│   │   └── ...
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── config/         # DB connection
│   │   ├── controllers/    # Route logic
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API endpoints
│   │   └── ...
└── README.md
```

## ⚡ Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB Atlas Account (or local MongoDB)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd meta-detector-sugarcane
    ```

2.  **Install Server Dependencies**:
    ```bash
    cd server
    npm install
    ```

3.  **Install Client Dependencies**:
    ```bash
    cd ../client
    npm install
    ```

4.  **Environment Setup**:
    Create a `.env` file in the `server` directory:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    NODE_ENV=development
    ```

### Running Locally

1.  **Start Backend**:
    ```bash
    cd server
    npm run dev
    ```
    Server will run on `http://localhost:5000`.

2.  **Start Frontend**:
    ```bash
    cd client
    npm run dev
    ```
    Client will run on `http://localhost:5173`.

## 🌐 Deployment

### Frontend (Vercel)
1.  Push code to GitHub.
2.  Import the `client` folder into Vercel.
3.  Add environment variables if needed.
4.  Deploy!

### Backend (Render/Railway)
1.  Push code to GitHub.
2.  Import the `server` folder into Render/Railway.
3.  Add environment variables (`MONGO_URI`, `JWT_SECRET`).
4.  Deploy!

## 🔒 Security Note
- Passwords are hashed using BCrypt.
- API endpoints are protected with JWT Middleware.
- CORS is configured to allow frontend communication.

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.
