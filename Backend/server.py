from pymongo import MongoClient
from flask import Flask
from flask import jsonify, make_response, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)


client = MongoClient(
    "mongodb+srv://admin:admin@hacktober.odrlq.mongodb.net/TreeHacks?retryWrites=true&w=majority")

db = client["TreeHacks"]

@app.route("/ping")
def ping():
    return "Hello World"
@app.route('/login', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def index():

    user_json = request.get_json()

    user_email = user_json['user']['email']

    db_collection = db["users"]

    result = db_collection.find_one({"email": user_email})

    if result is None:
        return make_response(jsonify({"Error": "User Not Found"}), 400)
    else:
        return make_response(jsonify({"email": result['email']}), 200)


app.run(host='0.0.0.0', port=8080, debug=True)
