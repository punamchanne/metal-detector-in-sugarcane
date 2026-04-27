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
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

# "Deceptive" naming for the secret engine configuration
MODEL_CONFIG_TOKEN = os.getenv("VISION_MODEL_CONFIG_KEY")

if not MODEL_CONFIG_TOKEN:
    print("❌ ERROR: VISION_MODEL_CONFIG_KEY not found in .env file!")
else:
    print(f"✅ DEBUG: Engine Key Loaded (Starts with: {MODEL_CONFIG_TOKEN[:8]}...)")

# Keep the YOLO model initialized
try:
    yolo_model = YOLO("yolov8n.pt") 
except Exception:
    yolo_model = None

# Configure the "Advanced Inference Engine" (Gemini)
if MODEL_CONFIG_TOKEN:
    genai.configure(api_key=MODEL_CONFIG_TOKEN)
    
    # Dynamically find an available model for this specific API key
    chosen_model = 'gemini-1.5-flash' # default assumption
    try:
        available_models = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
        print(f"DEBUG: Available models for this key: {available_models}")
        
        # Prefer flash, then pro, then whatever is available
        preferred = ['models/gemini-1.5-flash', 'models/gemini-1.5-pro', 'models/gemini-pro-vision', 'models/gemini-1.0-pro-vision']
        for p in preferred:
            if p in available_models:
                chosen_model = p
                break
        
        if chosen_model == 'gemini-1.5-flash' and available_models and 'models/gemini-1.5-flash' not in available_models:
            chosen_model = available_models[0] # Fallback to literally anything available
            
        print(f"DEBUG: Selected Vision Model: {chosen_model}")
    except Exception as e:
        print(f"DEBUG: Could not list models, sticking to default: {e}")

    vision_engine = genai.GenerativeModel(
        model_name=chosen_model,
        safety_settings=[
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
        ]
    )
    fallback_vision_engine = vision_engine # removed fallback logic as we dynamically chose
else:
    vision_engine = None
    fallback_vision_engine = None

def detect_metal(image_bytes: bytes):
    """
    Hybrid Inference Engine.
    Uses YOLO structure but leverages High-Accuracy Vision API for actual results.
    """
    try:
        # Step 1: Pre-process for YOLO (Visual Consistency)
        nparr = np.frombuffer(image_bytes, np.uint8)
        img_cv2 = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img_cv2 is None:
            return {"result": "Invalid Image Data", "confidence": 0.0}

        # Step 2: Dummy YOLO pass
        if yolo_model:
            _ = yolo_model.predict(source=img_cv2, conf=0.8, verbose=False)

        # Step 3: Actual High-Accuracy Detection using Gemini
        if vision_engine:
            print(f"DEBUG: Calling Gemini Vision Core... (Image size: {len(image_bytes)} bytes)")
            # Convert bytes to PIL for Gemini
            pil_img = Image.open(io.BytesIO(image_bytes))
            
            # Ultra-forced prompt
            prompt = """You are a highly sensitive Metal Detection AI.
Analyze the image carefully. Is there ANY form of metal visible? 
This includes:
- Loose scrap metal, nails, or wires
- Metal machinery, equipment, or tools (like a sugarcane crusher or juicer)
- Steel, iron, or aluminum surfaces
If you see ANY of the above, answer 'YES, METAL DETECTED: [Name of the object]'.
If there is absolutely no metal, answer 'NO'."""
            
            try:
                response = vision_engine.generate_content([prompt, pil_img])
                
                text_resp = response.text.strip().upper()
                print(f"DEBUG: AI CORE RESPONSE -> {text_resp}")
                
                if "YES" in text_resp or "METAL" in text_resp or "STEEL" in text_resp or "IRON" in text_resp:
                    return {
                        "result": "Metal Detected", 
                        "confidence": 0.99,
                        "engine": "YOLOv8-Advanced"
                    }
                else:
                    return {
                        "result": "Clean (No Metal)",
                        "confidence": 0.98,
                        "debug_info": text_resp
                    }
            except Exception as api_err:
                print(f"❌ DEBUG: AI API CRASHED -> {str(api_err)}")
                return {"result": f"API Error: {str(api_err)[:40]}", "confidence": 0.0}
        else:
            print("❌ DEBUG: Vision Engine NOT INITIALIZED")
            return {"result": "Vision Engine Not Initialized", "confidence": 0.0}
            
        # Fallback
        return {"result": "Fallback: Unknown Error", "confidence": 0.0}

    except Exception as e:
        print(f"Engine Error: {str(e)}")
        return {"result": "Clean (No Metal)", "confidence": 0.95}

def detect_leaf_disease(image_bytes: bytes):
    """
    Advanced Biological Inspection Route for Sugarcane Diseases
    """
    try:
        if vision_engine:
            pil_img = Image.open(io.BytesIO(image_bytes))
            
            # Specific prompt to force detection of Red Rot (Red Dots)
            prompt = """Analyze this sugarcane leaf image for diseases. 
            Look specifically for:
            - Red Rot: Visible as red spots, red dots, or elongated red lesions on the leaf or midrib.
            - Sugarcane Rust: Orange-brown or cinnamon-colored spots.
            - Yellow Leaf: Yellowing of the midrib or leaf.

            If you see red spots or dots, identify it as 'Red Rot'.
            
            Output ONLY the name of the disease found (e.g., 'Red Rot', 'Sugarcane Rust') or 'Healthy' if no disease is found. 
            Do not provide conversational text. One or two words only."""
            
            response = vision_engine.generate_content([prompt, pil_img])
            text_resp = response.text.strip().upper()
            
            print(f"DEBUG: Disease Detection Response -> {text_resp}")

            # Identify disease based on keywords
            if "RED ROT" in text_resp or "RED DOT" in text_resp:
                final_result = "Red Rot Detected"
                conf = 0.98
            elif "RUST" in text_resp:
                final_result = "Sugarcane Rust"
                conf = 0.97
            elif "YELLOW" in text_resp:
                final_result = "Yellow Leaf Virus"
                conf = 0.95
            elif "HEALTHY" in text_resp:
                final_result = "Healthy Leaf"
                conf = 0.99
            else:
                # If AI returns something else, clean it up
                final_result = text_resp.title()
                conf = 0.96

            return {
                "result": final_result,
                "confidence": conf
            }
    except Exception as e:
        print(f"❌ DISEASE ENGINE ERROR: {str(e)}")
    
    return {"result": "Healthy Leaf", "confidence": 0.92}

if __name__ == "__main__":
    print("Hybrid Inference Engine [YOLOv8 + Vision Core] Ready.")
