from pymongo import MongoClient
from flask import Flask
from flask import jsonify, make_response, request

app = Flask(__name__)

client = MongoClient(
    "mongodb+srv://admin:admin@hacktober.odrlq.mongodb.net/TreeHacks?retryWrites=true&w=majority")

db = client["TreeHacks"]


@app.route('/login', methods=['POST', 'GET'])
def index():
    db_collection = db["users"]

    if request.method == 'POST':
        email = request.form['email']
    else:
        email = request.args.get('email')

    result = db_collection.find_one({"email": email})

    if result is None:
        return make_response(jsonify({"Error": "User Not Found"}), 400)
    else:
        return make_response(jsonify({"user_type": result['userType']}), 200)


app.run(host='0.0.0.0', port=81)
