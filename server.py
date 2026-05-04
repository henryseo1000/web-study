import os, random;
from flask import Flask, render_template, url_for, redirect, request, jsonify, abort, send_file;
from dotenv import load_dotenv;
from flask_mail import Message, Mail;
import firebase_admin;
from firebase_admin import credentials;
from firebase_admin import firestore;
from firebase_admin import db;

from config import *;

# init app
app = Flask("__name__");
path = "./templates";

# firebase settings
cred = credentials.Certificate("./mjusubwaystation-firebase-adminsdk-lxlon-53f126911e.json");
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://mjusubwaystation-default-rtdb.firebaseio.com'
});
firestore_db = firestore.client()

#load env variables
load_dotenv()

def redirect_to():
    return url_for('static', filename='favicon/favicon.ico');

app.add_url_rule('/favicon.ico', 'redirect_to', redirect_to);

#routes for web
@app.route("/")
def index():
    return render_template("index.html");

@app.route("/<string:path>")
def route(path):
    try :
        return render_template("/" + path + "/index.html");
    except:
        abort(404)

@app.route("/videos/<int:path>")
def video_route(path):
    video_title = os.listdir("./static/videos")[path - 1]

    try :
        return send_file("./static/videos/"+ video_title);
    except:
        abort(404)

@app.route("/login", methods=['POST'])
def login():
    return ""

@app.route("/email", methods=['POST'])
def send_email():
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USERNAME'] = 'henryseo1000@gmail.com'
    app.config['MAIL_PASSWORD'] = os.getenv("GMAIL_PASSWORD")
    app.config['MAIL_USE_TLS'] = False
    app.config['MAIL_USE_SSL'] = True

    def generateCode() : 
        code = ""

        for i in range(0, 6):
            code += str(random.randint(0, 9))

        return code

    try :
        mail = Mail(app)
        msg = Message('[이메일 테스트] 안녕하세요!', sender='henryseo1000@gmail.com', recipients=[request.form["customer_email"]])
        msg.html = render_template('email_template.html', auth_code = generateCode())
        mail.send(msg)

        return "메일이 성공적으로 전송되었습니다."
    
    except:
        return "문제가 발생했습니다. 다시 시도해주세요."

@app.route("/dir_info", methods=['GET'])
def getDir() :
    dir_list = [f for f in os.listdir(path) if os.path.isdir(os.path.join(path, f))]

    return {
        "dir_list": dir_list,
        "totalNum" : len(dir_list)
    };

@app.route('/getESP32')
def getESP32():
    distance_ref = db.reference('/distance');
    led_ref = db.reference('/led');

    distances = distance_ref.get();
    led_stats = led_ref.get()

    return jsonify({"led": led_stats, "distance": distances}), 200

@app.route("/setESP32", methods=['POST'])
def setESP32():
    distance_ref = db.reference('/distance');
    led_ref = db.reference('/led');

    distance_id = distance_ref.push(1);
    led_id = led_ref.push(False);

    return jsonify({"led_id": led_id.key, "distance_id": distance_id.key}), 201

@app.route("/getConfig")
def getConfig() :
    return {
        "apiKey": "AIzaSyBFmT3Dn80MzeMvU04LKlAnn3NExucKZR0",
        "authDomain": "mjusubwaystation.firebaseapp.com",
        "projectId": "mjusubwaystation",
        "storageBucket": "mjusubwaystation.firebasestorage.app",
        "databaseURL": "https://mjusubwaystation-default-rtdb.firebaseio.com",
        "messagingSenderId": "638521949353",
        "appId": "1:638521949353:web:bf3e7b019577ad0d8a7db8"
    }

@app.errorhandler(404)
def page_not_found(e):
    return render_template("404-notfound.html"), 404

if __name__ == '__main__':
   app.run('0.0.0.0', port=5001, debug=True);