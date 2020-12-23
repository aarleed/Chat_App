from flask import Flask, redirect, url_for, render_template, request, session
from flask_socketio import SocketIO, emit, send

# app = Flask("Login")
app = Flask(__name__)

app.config["SECRET_KEY"] = "40832hfondnfonfr48934r9"
socketIO = SocketIO(app, cors_allowed_origins = "*", async_mode='threading')

app.host = 'localhost'
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/login", methods = ["POST", "GET"])
def login():

	if request.method == "POST":

		session.permanent = True
		user = request.form["nm"] # form 'name' attribute

		session["user"] = user
		return redirect(url_for("user"))

	else:

		if "user" in session:
			return redirect(url_for("user"))

		return render_template("chat.html")

# ***********************************************************
# change content to fit our goal. Just to test session feature
@app.route("/user")
def user():

	if "user" in session:

		user = session["user"]
		return f"<h1>Welcome to the site {user}</h1>"

	else:

		return redirect(url_for("login"))
# ***********************************************************

@app.route("/logout")
def logout():
	session.pop("user", None)
	
	return redirect(url_for("login"))

@socketIO.on("message")
def handle_message_client(json):
	print(f"[S]: Received message '{json}' from client")
	send(json, broadcast = True)

	socketIO.emit("response", json)

@socketIO.on('my event')
def handle(json):
	print('received: ' + str(json))

if __name__ == "__main__":
	socketIO.run(app, debug = True)
	# app.run()
