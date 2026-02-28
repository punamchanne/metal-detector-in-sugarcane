from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="CaneGuard AI Microservice")

# Allow Node.js Backend to communicate with Python Microservice
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Node server origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AI Microservice is Running!"}

@app.post("/predict-metal")
async def predict_metal(file: UploadFile = File(...)):
    """
    Mock Route for YOLOv8 Metal Detection
    Replace this logic later with actual torch/ultralytics model inference
    """
    try:
        # Read file into memory
        contents = await file.read()
        
        # Example: 
        # model = YOLO('yolov8n.pt')
        # results = model(contents)
        
        # Mock Response
        return {
            "result": "Metal Detected",
            "confidence": 0.98,
            "filename": file.filename
        }
    except Exception as e:
        return {"error": str(e)}

@app.post("/predict-disease")
async def predict_disease(file: UploadFile = File(...)):
    """
    Mock Route for MobileNetV2 Leaf Disease Detection
    Replace this logic later with actual TensorFlow/Keras model inference
    """
    try:
        # Read file into memory
        contents = await file.read()
        
        # Example: 
        # model = tf.keras.models.load_model('mobilenet.h5')
        # img = preprocess(contents)
        # results = model.predict(img)
        
        # Mock Response
        return {
            "result": "Red Rot",
            "confidence": 0.92,
            "filename": file.filename
        }
    except Exception as e:
        return {"error": str(e)}

# Note: Start using `uvicorn main:app --reload`
