import flask
from flask import Flask, request, render_template
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
collection = db["Users"]





@app.route('/sign-up', methods = ['GET', 'POST'])
def signUp():
    collection = db["Users"]
    if request.method == 'POST':
        name = request.form.get("name")
        userType = request.form.get("type")
        password = request.form.get("password")
        dob = request.form.get("dob")
        studentRollNo = request.form.get("rollno")
        email = request.form.get("email")
        if userType == "Student":
            collection.insert_one({'name': name, 'type': userType, 'email': email, 'password': password,'dob': dob, 'studentRNo': studentRollNo} )
        else:
            collection.insert_one({'name': name, 'type': userType, 'email': email, 'password': password,'dob': dob})

@app.route('/login', methods = ['GET', 'POST'])
def login():
    collection = db["Users"]
    if request.method == 'POST':
        email = request.form.get("email")
        password = request.form.get('password')
        cursor = collection.find({'email': email})
        if cursor['password'] == password:
            return True
        else:
            return False
        
@app.route('/addHall', methods = ['GET', 'POST'])
def addHall():
    collection = db["LectureHalls"]
    if request.method == 'POST':
        name = request.form.get("name")
        location = request.form.get("location")
        capacity = request.form.get("capacity")
        collection.insert_one({'name': name, 'location': location,'capacity': capacity})

@app.route('/addLecture', methods = ['GET', 'POST'])
def addLecture():
    collection = db["Lectures"]
    if request.method == 'POST':
        name = request.form.get("name")
        location = request.form.get("location")
        capacity = request.form.get("capacity")
        collection.insert_one({'name': name, 'location': location,'capacity': capacity})

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


