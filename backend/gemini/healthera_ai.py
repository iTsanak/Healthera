import google.generativeai as genai
from google.generativeai import caching
from django.conf import settings
import os
from dotenv import load_dotenv
import datetime
import json

load_dotenv()


class HealtheraAI:
    def __init__(self):
        genai.configure(api_key=os.environ.get('GEMINI_API_KEY'))
        self.model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            generation_config={
                "temperature": 1,
                "top_p": 0.95,
                "top_k": 64,
                "max_output_tokens": 8192,
                "response_mime_type": "text/plain",
            },
            system_instruction=(
                "You are an advanced cognitive AI designed to analyze food product ingredients and assess their healthiness. "
                "Users will upload a picture of a product's ingredients label. Your task is to extract the ingredients from the image, "
                "provide a brief description for each ingredient, assign a health score from 0 to 100 for each ingredient, and calculate an overall health score for the entire product. "
                "You will be careful to give feedback only for the edible product's ingredients, and don't give feedback to any other unrelated products (example motor oil, glue etc.). "
                "You will only reply to health-related topics regarding the feedback and the ingredients that you are shown via the picture that is shown to you. "
                "And anything else unrelated you will not give any advice and prompt to post a pic of a product's ingredients."
                "Instructions:"
                "Image Analysis:Analyze the uploaded image to identify and extract the text of each ingredient listed on the label."
                "Ingredient Extraction:Separate and list each ingredient individually from the extracted text."
                "Ingredient Description:Provide a brief and informative description for each ingredient, focusing on its common uses and potential health effects."
                "Health Score Assignment:Assign a health score between 0 and 100 for each ingredient based on its healthiness, with 0 being the least healthy and 100 being the healthiest."
                "Overall Health Score Calculation:Calculate an overall health score for the product by averaging the health scores of all the ingredients. Ensure the overall score is also between 0 and 100."
                "Output Format:Return the results in the following structured JSON format:"
                "{"
                "    \"overall_score\": ...,"
                "    \"ingredients\": ["
                "        [\"ingredient_1_name\", \"score\", \"description\"],"
                "        [\"ingredient_2_name\", \"score\", \"description\"],"
                "        ..."
                "    ],"
                "    \"additional_notes\": ..."
                "}"
                "Make descriptions straightforward, concise. Do not include any markdown expect the json answer. Do not repeat the same ingredient more than once."
            ),
        )

    def analyze_image(self, image_path):
        myfile = genai.upload_file(image_path)

        chat_session = self.model.start_chat(history=[])

        response = chat_session.send_message(myfile)
        print(response.text)
        my_text = response.text.replace("\n", "").replace("\"", '"').replace(
            "```json", "").replace("```", "")

        # Ensure the response is in JSON format
        try:
            response_json = json.loads(my_text)
        except json.JSONDecodeError:
            print("Failed to parse response as JSON")
            return None

        print(json.dumps(response_json, indent=4))
        return response_json
