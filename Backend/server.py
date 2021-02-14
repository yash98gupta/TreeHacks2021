from pymongo import MongoClient
from flask import Flask
from flask import jsonify, make_response, request
from flask_cors import CORS, cross_origin
from bson.json_util import dumps
from geopy.geocoders import Nominatim
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app, support_credentials=True)


client = MongoClient(
    "mongodb+srv://admin:admin@hacktober.odrlq.mongodb.net/TreeHacks?retryWrites=true&w=majority")

db = client["TreeHacks"]


@app.route("/ping")
def ping():
    return "Hello World"


@app.route('/signup', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def signup():
    db_collection = db["users"]
    user_json = request.get_json()

    # {"email": "yash@usc.edu", "name": "Yash","gender": "M", "contact": "4443128878"}

    email = user_json['email']  # xyz@xyz.com
    name = user_json['name']  # Varun Shanbhag
    gender = user_json['gender']  # M/F
    contact = user_json['contact']  # 3123129988

    mydict = {"email": email, "name": name,
              "gender": gender, "contact": contact}

    result = db_collection.insert_one(mydict)

    if result.inserted_id is None:
        return make_response(jsonify({"Error": "Something went wrong"}), 400)
    else:
        return make_response(jsonify({"Message": "Signup Completed"}), 200)


@app.route('/login', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def login():

    user_json = request.get_json()

    user_email = user_json['user']['email']

    db_collection = db["users"]

    result = db_collection.find_one({"email": user_email})

    if result is None:
        return make_response(jsonify({"Error": "User Not Found"}), 400)
    else:
        return make_response(jsonify({"name": result['name'], "email": result['email'], "gender": result['gender'],
                                      "contact": result['contact']}), 200)


@app.route('/events', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def events():
    db_collection = db["events"]
    result = db_collection.find({})
    result = list(result)
    return make_response(dumps(result), 200)


@app.route('/geteventforuser', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def geteventforuser():
    db_collection = db["events"]
    user_json = request.get_json()
    # {"user": "varun@iit.edu"}
    user = user_json['user']  # varun@iit.edu
    result = db_collection.find({"user": user})
    result = list(result)
    return make_response(dumps(result), 200)


@app.route('/add_events', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def add_events():
    db_collection = db["events"]
    user_json = request.get_json()

    # {"event": "Table Tennis", "event_category": "Sports","lat": "37.4216", "lon": "122.1838", "time": "16:00-18:00", "user": "yash@usc.edu"}

    event = user_json['event']  # Golf
    event_category = user_json['event_category']  # Sports
    time = user_json['time']  # 14:00-16:00
    status = "Active"
    user = user_json['user']  # email_id
    location = user_json['location']  # Stanford golf Course
    gender = user_json['gender']
    geolocator = Nominatim(user_agent="TreeHacks")
    cord = geolocator.geocode(location)
    mydict = {"event": event, "event_category": event_category,
              "lat": cord.latitude, "lon": cord.longitude, "time": time,
              "status": status, "user": user, "gender": gender, "location": location}

    result = db_collection.insert_one(mydict)

    if result.inserted_id is None:
        return make_response(jsonify({"Error": "Something went wrong"}), 400)
    else:
        return make_response(jsonify({"Message": "Event Enterend"}), 200)


@app.route('/requestevent', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def requestevent():
    db_collection = db["req"]
    user_json = request.get_json()

    # {"event": "123", "owner": "test@test.com","requester": "varun@iit.edu"}

    event = user_json['event']  # event_id
    owner = user_json['owner']  # xyz@xyz.com
    requester = user_json['requester']  # self_email

    mydict = {"event": event, "owner": owner,
              "requester": requester, "decision": ""}

    result = db_collection.insert_one(mydict)

    if result.inserted_id is None:
        return make_response(jsonify({"Error": "Something went wrong"}), 400)
    else:
        return make_response(jsonify({"Message": "Request Sent"}), 200)


@app.route('/eventdecision', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def eventdecision():
    db_collection = db["req"]
    user_json = request.get_json()

    # {"reqid":"232" "decision": "Yes/No"}
    reqid = user_json['reqid']  # event_id
    decision = user_json['decision']  # Yes/No

    myquery = {"_id": ObjectId(reqid)}
    newvalues = {"$set": {"decision": decision}}

    result = db_collection.update_one(myquery, newvalues)

    if result.matched_count > 0:
        return make_response(jsonify({"Message": "Request Updated"}), 200)
    else:
        return make_response(jsonify({"Error": "Something went wrong"}), 400)


@ app.route('/getrequestforeventid', methods=['POST', 'GET'])
@ cross_origin(supports_credentials=True)
def getrequestforeventid():
    db_collection = db["req"]
    user_json = request.get_json()
    # {"event": "123"}
    event = user_json['event']  # event_id
    result = db_collection.find({"event": event})
    return make_response(dumps(result), 200)


app.run(host='0.0.0.0', port=8080, debug=True)
