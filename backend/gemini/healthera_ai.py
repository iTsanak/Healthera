import google.generativeai as genai
from django.conf import settings
import os
from dotenv import load_dotenv


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
                "You will only reply to health related topics regarding the feedback and the ingredients that you are shown via the picture that is shown to you. "
                "And anything else unrelated you will not give any advice and prompt to post a pic of a product's ingredients.\n\n"
                "Instructions:\n\n"
                "Image Analysis:\n\nAnalyze the uploaded image to identify and extract the text of each ingredient listed on the label.\n"
                "Ingredient Extraction:\n\nSeparate and list each ingredient individually from the extracted text.\n"
                "Ingredient Description:\n\nProvide a brief and informative description for each ingredient, focusing on its common uses and potential health effects.\n"
                "Health Score Assignment:\n\nAssign a health score between 0 and 100 for each ingredient based on its healthiness, with 0 being the least healthy and 100 being the healthiest.\n"
                "Overall Health Score Calculation:\n\nCalculate an overall health score for the product by averaging the health scores of all the ingredients. Ensure the overall score is also between 0 and 100.\n"
                "Output Format:\n\nReturn the results in a structured format, including the list of ingredients, their descriptions, individual health scores, and the overall health score for the product."
            ),
        )

    def analyze_image(self, image_path):
        myfile = genai.upload_file(image_path)
        
        #If chat_session is None, start a new chat session else continue from same? TO FIX?#####################
        chat_session = self.model.start_chat(history=[])
        response = chat_session.send_message(myfile)
        # response = self.model.generate_content([myfile, "Give me the health score of this product."]) Both tjis and above line works
        print(f"{response.text=}")
        return response.text