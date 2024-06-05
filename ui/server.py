from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from pymongo import MongoClient
import dotenv
import os
import ai
import logging

app = Flask(__name__)
CORS(app)

dotenv.load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")

if not MONGODB_URI:
    raise ValueError("No MONGODB_URI found in environment variables")

try:
    client = MongoClient(MONGODB_URI)
    db = client.get_database("NZSL")
except Exception as e:
    logging.error(f"Failed to connect to MongoDB: {e}")
    raise

@app.route("/chur")
def chur():
    print("chur")
    return jsonify("chur, g")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        input_data = data['input']

        pose_input_data = np.array(input_data[0]).reshape(1, -1, 23 * 3).astype(np.float16)
        left_hand_input_data = np.array(input_data[1]).reshape(1, -1, 21 * 3).astype(np.float16)
        right_hand_input_data = np.array(input_data[2]).reshape(1, -1, 21 * 3).astype(np.float16)

        decoded_sequence = ai.decode_sequence([pose_input_data, left_hand_input_data, right_hand_input_data])

        decoded_sequence = [decoded_part.item() for decoded_part in decoded_sequence]

        decoded_sentence = []

        # Fetch all words in one query
        words = db.eng_signs_to_profiles.find({"profile_id": {"$in": decoded_sequence}})
        word_dict = {word['profile_id']: word for word in words}

        # Fetch all possible words in one query
        possible_words = db.english_signs.find({"id": {"$in": [word['english_id'] for word in word_dict.values()]}})
        possible_word_dict = {word['id']: word for word in possible_words}

        # Map tokens to words
        for token in decoded_sequence:
            word = word_dict.get(token)
            if word is None:
                decoded_sentence.append("UNKNOWN")
                continue

            possible_word = possible_word_dict.get(word['english_id'])
            if possible_word is not None:
                decoded_sentence.append(possible_word['english_sign'])
            else:
                decoded_sentence.append("UNKNOWN")

        return jsonify(decoded_sentence)
    except Exception as e:
        logging.error(f"Error in predict route: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=4000)
    print("Python backend running on port 4000")
