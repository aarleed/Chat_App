from flask import Flask;
from flask_socketio import SocketIO, send

# app = Flask(__name__)
# app.config['SECRET_KEY'] = 'secret'

# socketIo = SocketIO(app)

# app.debug = True

# app.host = 'localhost'

# @socketIo.on("message")
# def handleMessage(msg):
#     print(msg)
#     send(msg, broadcast=True)
#     return None

# if __name__  == '__main__':
#     # socketIo.run(app)
#     app.run()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'APP_SECRET_KEY'

app.config['CORS_HEADERS'] = 'Content-Type'
# app.config['transports'] = 'websocket'
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

socketio.run(app, debug=True)