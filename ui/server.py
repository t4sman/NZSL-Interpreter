from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route("/chur")
def chur():
    print("chur")
    return jsonify("chur, g")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    print(data)
    return jsonify("chur, g")



if __name__ == "__main__":
    app.run(port=4000)