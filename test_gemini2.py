import os
from PIL import Image
import io
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv("ai_service/.env")
key = os.getenv("VISION_MODEL_CONFIG_KEY")
print("Key exists:", bool(key))

genai.configure(api_key=key)
vision_engine = genai.GenerativeModel('gemini-1.5-flash')

img = Image.new('RGB', (100, 100), color = 'red')

try:
    response = vision_engine.generate_content(["Is this red?", img])
    print(response.text)
except Exception as e:
    print(f"CRASH: {e}")
