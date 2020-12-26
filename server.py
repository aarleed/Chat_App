from flask import Flask, redirect, url_for, render_template, request, session, flash
# from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, emit, send
from werkzeug.security import generate_password_hash, check_password_hash
import time_stamp
import time

# app = Flask("Login")
app = Flask(__name__)

app.config["SECRET_KEY"] = "40832hfondnfonfr48934r9"
socketIO = SocketIO(app, cors_allowed_origins = "*", async_mode='threading')

app.host = 'localhost'
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/time')
def get_current_time():
	''' Test time'''
	return {'time': time.asctime( time.localtime(time.time()) )}

@app.route('/signup', methods=['GET', 'POST'])
def add_user():
	''' Add a user to the session '''
	session.permanent = True
	user_json = request.get_json()
	session[ user_json['name'] ] = generate_password_hash(user_json['pass'])
	# session["user"] = {"name": user_json['name'], "pass": user_json['pass']}
	
	return {'hi': str(user)}

@app.route('/', defaults = {'path': ''})
@app.route('/<path:path>')
def catch_all(path):
	''' default landing page'''
	return 'Path: %s' % path

# @app.route("/login1", methods = ["POST", "GET"])
# def login():

# 	if request.method == "POST":
# 		session.permanent = True
# 		user = request.form["nm"] # form 'name' attribute

# 		session["user"] = user
# 		return redirect(url_for("user"))

# 	else:

# 		if "user" in session:
# 			return redirect(url_for("user"))
# 		return redirect(url_for("login"))
		# return render_template("chat.html")

# @app.route('/loggedIn', methods=['POST', "GET"])
# def loggedIn():
# 	print(session.get("logged_in", False), 'owkign')
# 	return {"loggedIn": session.get("logged_in", False)}

@app.route('/login', methods=['POST', "GET"])
def do_login():
	''' Login a user. '''
	data = request.json
	print(session)
	# data['pass'] == session[data['name']]
	if data['name'] in session and check_password_hash(session[data['name']], data['pass']):
	# if request.form['password'] == 'password' and request.form['username'] == 'admin':
		return {"session_id" : session[data['name']]}
	else:
		return {"session_id" : False}

# ***********************************************************
# change content to fit our goal. Just to test session feature
@app.route("/user")
def user():

	if "user" in session:

		user = session["user"]
		return f"<h1>Welcome to the site {user}</h1>"

	else:
		# return render_template('index.html')
		return redirect(url_for("login"))
# ***********************************************************

@app.route("/main")
def chat():
	if "user" in session:
		return {"redirect": False}
	else:
		return {"redirect": True}

@app.route("/logout")
def logout():
	return {}
	

@socketIO.on("message")
def handle_message_client(json):
	json['time'] = time_stamp.getCurrentTimeStamp()
	print(f"[S]: Received message '{json}' from client")
	
	# send(json, broadcast = True)

	socketIO.emit("message", json)

@socketIO.on('my event')
def handle(json):
	print('received: ' + str(json))

if __name__ == "__main__":
	socketIO.run(app, debug = True)
