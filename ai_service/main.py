from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import os

from yolo_inference import detect_metal

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
    Real Route for YOLOv8 Metal Detection
    """
    try:
        # Read file into memory
        contents = await file.read()
        
        # Call the YOLOv8 model
        detection_result = detect_metal(contents)
        
        # If the result has an error, propagate it
        if "error" in detection_result:
             return {"error": detection_result["error"]}
        
        return {
            "result": detection_result["result"],
            "confidence": detection_result["confidence"],
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
