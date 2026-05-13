# CaneGuard AI - Metal Detection & Disease Analysis in Sugarcane

A high-accuracy, AI-powered monitoring system designed for the sugarcane industry. Using a hybrid approach of **YOLOv8** and **Google Gemini Vision AI**, CaneGuard detects metallic contaminants and biological diseases in real-time.

## 🚀 Key Features

- **Hybrid AI Inspection**: Combines local YOLOv8 inference with high-accuracy Gemini Vision API.
- **Metal Detection**: Identifies nails, wires, scrap metal, and industrial waste camouflaged in sugarcane.
- **Biological Analysis**: Detects sugarcane diseases like **Red Rot**, **Rust**, and **Yellow Leaf Virus**.
- **Real-time Dashboard**: Live monitoring of hardware status, detection history, and analytics.
- **Instant Alerts**: Sound and visual alerts triggered automatically upon positive detection.
- **Secure MERN Architecture**: Robust authentication and data persistence using MongoDB.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Lucide Icons, Recharts.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose).
- **AI Microservice**: Python, FastAPI, YOLOv8 (Ultralytics), Google Generative AI (Gemini Flash).
- **Security**: JWT Authentication, BCrypt Hashing, CORS Protection.

## 📂 Project Structure

```
/
├── client/                 # React Frontend (Vite)
├── server/                 # Node.js Backend (Express)
├── ai_service/             # Python AI Microservice (FastAPI + YOLO + Gemini)
├── yolov8n.pt              # Local YOLO Model Weights
└── README.md
```

## ⚡ Setup & Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (Atlas or Local)
- Python (3.9+)
- Google Gemini API Key ([Get it here](https://aistudio.google.com/))

### 1. Backend (Node.js)
```bash
cd server
npm install
# Create .env with: PORT=5001, MONGO_URI, JWT_SECRET
npm run dev
```

### 2. Frontend (React)
```bash
cd client
npm install
npm run dev
```

### 3. AI Service (Python)
```bash
cd ai_service
pip install -r requirements.txt
# Create .env with: VISION_MODEL_CONFIG_KEY=your_gemini_key
python -m uvicorn main:app --reload
```

## 🧠 AI Logic (How it works)
The system uses a **Discovery Phase** to find the best available Gemini model (1.5-Flash or Pro) for your API key. 
1. **Local Pass**: YOLOv8 checks for objects in the frame.
2. **AI Validation**: Gemini Vision AI performs a "Critical Inspection" to verify if the object is metal or if the leaf shows disease symptoms.
3. **Classification**: Results are sent to the Node.js server to trigger alerts and save history.

## 🤝 Contributing
Feel free to fork this project and submit PRs. For major changes, please open an issue first.

## 📄 License
MIT License - Created for Sugarcane Industry Automation.
