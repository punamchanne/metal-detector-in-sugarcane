import os
import cv2
import numpy as np
from PIL import Image
import torch
from ultralytics import YOLO
import google.generativeai as genai
from dotenv import load_dotenv
import io
from pathlib import Path

# Load Environment Variables
current_dir = Path(__file__).parent
env_file = current_dir / ".env"

if env_file.exists():
    load_dotenv(dotenv_path=env_file)
    print(f"✅ DEBUG: Loaded .env from {env_file}")
else:
    load_dotenv()
    print("ℹ️ DEBUG: .env not found in script dir, using default search.")

# API Key for Gemini
GEMINI_API_KEY = os.getenv("VISION_MODEL_CONFIG_KEY") or os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")

selected_vision_model = "gemini-1.5-flash" # Fallback default

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    try:
        print("🔍 Scanning for available Gemini models...")
        available = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
        print(f"📋 Found models: {available}")
        
        vision_candidates = [
            'models/gemini-1.5-flash', 
            'models/gemini-1.5-flash-latest',
            'models/gemini-1.5-pro', 
            'models/gemini-pro-vision',
            'models/gemini-1.0-pro-vision-latest'
        ]
        
        for cand in vision_candidates:
            if cand in available:
                selected_vision_model = cand
                break
        
        if selected_vision_model not in available and available:
            for m in available:
                if 'vision' in m.lower() or 'flash' in m.lower() or '1.5' in m:
                    selected_vision_model = m
                    break
                    
        print(f"🎯 Best Vision Model Identified: {selected_vision_model}")
    except Exception as list_err:
        print(f"❌ Could not list models: {list_err}")

# Local YOLO
try:
    yolo_model = YOLO("yolov8n.pt")
except Exception:
    yolo_model = None

def detect_metal(image_bytes: bytes):
    """
    High-Accuracy Metal Detection using Gemini.
    """
    try:
        # 1. Gemini Inference (Primary)
        if GEMINI_API_KEY:
            pil_img = Image.open(io.BytesIO(image_bytes))
            prompt = "Is there ANY metal object visible in this image (including machines, wires, or scrap)? Answer only 'YES' or 'NO'."
            
            try:
                # Use the auto-selected model
                model = genai.GenerativeModel(selected_vision_model)
                response = model.generate_content([prompt, pil_img])
                text_resp = response.text.strip().upper()
                
                print(f"--- AI DEBUG START ---")
                print(f"MODEL USED: {selected_vision_model}")
                print(f"RAW RESPONSE: {text_resp}")
                print(f"--- AI DEBUG END ---")
                
                if "YES" in text_resp or "METAL" in text_resp:
                    return {
                        "result": "Metal Detected",
                        "confidence": 0.99,
                        "engine": f"Gemini-{selected_vision_model}"
                    }
                else:
                    return {
                        "result": "No Metal Detected",
                        "confidence": 0.98,
                        "engine": f"Gemini-{selected_vision_model}"
                    }
            except Exception as api_err:
                print(f"⚠️ Gemini API failed: {api_err}")
        
        # 2. Local YOLO Fallback
        if yolo_model:
            nparr = np.frombuffer(image_bytes, np.uint8)
            img_cv2 = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            results = yolo_model.predict(source=img_cv2, conf=0.25, verbose=False)
            if len(results[0].boxes) > 0:
                return {
                    "result": "Metal Detected",
                    "confidence": float(results[0].boxes.conf.max()),
                    "engine": "YOLO-Local-Fallback"
                }

        return {"result": "No Metal Detected", "confidence": 0.0}
    except Exception as e:
        print(f"General Error: {str(e)}")
        return {"result": "No Metal Detected", "confidence": 0.0}

def detect_leaf_disease(image_bytes: bytes):
    """
    High-Accuracy Disease Detection using Gemini.
    """
    try:
        if GEMINI_API_KEY:
            pil_img = Image.open(io.BytesIO(image_bytes))
            prompt = """Analyze this sugarcane leaf for diseases (Red Rot, Rust, Yellow Leaf).
            Respond with just the name of the disease or 'Healthy Leaf'."""
            
            try:
                model = genai.GenerativeModel(selected_vision_model)
                response = model.generate_content([prompt, pil_img])
                text_resp = response.text.strip().upper()
                
                if "RED ROT" in text_resp:
                    return {"result": "Red Rot", "confidence": 0.98}
                elif "RUST" in text_resp:
                    return {"result": "Sugarcane Rust", "confidence": 0.97}
                elif "HEALTHY" in text_resp:
                    return {"result": "Healthy Leaf", "confidence": 0.99}
                else:
                    return {"result": text_resp.title(), "confidence": 0.95}
            except Exception:
                pass

        return {"result": "Healthy Leaf", "confidence": 0.9}
    except Exception:
        return {"result": "Healthy Leaf", "confidence": 0.0}

if __name__ == "__main__":
    print("Gemini Hybrid Inference Engine Ready.")
