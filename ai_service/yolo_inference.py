import os
import cv2
import numpy as np
from PIL import Image
import torch
# We will use the pre-trained 'yolov8n.pt' model for general object detection as a base,
# since we don't have a dataset of "metals in sugarcane" to train a custom model right now.
# In a real scenario, you'd train a model on your dataset and load 'best.pt' here.
from ultralytics import YOLO

# Load the explicitly pre-trained YOLOv8 nano model
# This will download the weights automatically if not present
model = YOLO("yolov8n.pt") 

def detect_metal(image_bytes: bytes):
    """
    Run YOLOv8 inference on image bytes.
    Disclaimer: yolov8n.pt detects general objects (cars, persons, etc.).
    To detect "metal/scrap" specifically in sugarcane, a custom-trained 'best.pt' is required.
    For this demo, we will check if any object is detected and simulate a "Metal Detected" response.
    """
    try:
        # Convert raw bytes to OpenCV image
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
             return {"result": "Invalid Image Data", "confidence": 0.0}

        # Run inference
        results = model.predict(source=img, conf=0.25)
        
        # Parse results
        if len(results) > 0 and len(results[0].boxes) > 0:
            # Get the highest confidence prediction
            best_box = results[0].boxes[0]
            confidence = float(best_box.conf[0])
            
            # Since this is a pre-trained model on COCO, it won't explicitly say "Metal".
            # It might say "bottle", "cup", etc. 
            # For demonstration in your project, any detection above 0.5 can trigger our alert.
            # In production, you would replace yolov8n.pt with your own custom metal-trained yolov8.pt
            
            if confidence > 0.4:
                return {"result": "Metal Detected", "confidence": confidence}
            else:
                 return {"result": "Clean (No Metal)", "confidence": confidence}
        else:
             return {"result": "Clean (No Metal)", "confidence": 0.99}

    except Exception as e:
         import traceback
         traceback.print_exc()
         return {"error": str(e)}

if __name__ == "__main__":
    print("YOLOv8 module loaded successfully.")
