import flask
from flask import jsonify
from bson.json_util import dumps, loads

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json
from flask_cors import CORS 

app = flask.Flask(__name__)
CORS(app) 

data= {
    "name": "John",
    "age": 30,
    "city": "New York"
}
studentsData= [
    {
        "name": "John",
        "age": 30,
        "city": "New York"
    },
    {
        
        "name": "hdgjah",
        "age": 30,
        "city": "New York"
    },
    {
        "name": "dhbjakb",
        "age": 30,
        "city": "New York"
    },
    {
        
        "name": "kjbakhjbf",
        "age": 30,
        "city": "New York"
    },

]

uri = "mongodb+srv://username:pass@guestlecturemanagements.1lw6ihz.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# create collection
db = client["guestlecturemanagements"]
collection = db["users"]







@app.route('/')
def index():
    collection.insert_one({"name":"sai","password":"1234"})
    return "Hello World!"

# with nums argument 
@app.route('/students/<num>')
def students(num):
    if int(num)==0:
        return studentsData
    return studentsData[int(num)]

@app.route('/userDetails')
def userDetails():
    cursor=collection.find()
    return dumps(cursor)

@app.route('/lectureList')
def lectureList():
    collection = db["lectures"]
    cursor=collection.find()
    return dumps(cursor)

    
    





if __name__ == '__main__':
    app.run()


