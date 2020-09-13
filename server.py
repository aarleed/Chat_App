from flask import Flask, redirect, url_for, render_template, request, session
from flask_socketio import SocketIO, emit

app = Flask("Login")

app.config["SECRET_KEY"] = "40832hfondnfonfr48934r9"
socketIO = SocketIO(app)

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

@socketio.on("message")
def handle_message_client(json):
	print(f"[S]: Received message '{json}' from client")

	socketio.emit("response", json)

if __name__ == "__main__":
	socketio.run(app, debug = True)
