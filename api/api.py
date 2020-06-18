import time
from flask import Flask, request
from flask_socketio import SocketIO, emit, rooms
from urllib.parse import urlparse, unquote

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

users = [{
    'name': 'santi',
    'status': 0,
    'password': 'hola'
}]

messages = [
    {
        'user_name': 'santi',
        'text': 'Hello guys!',
        'time': time.time() * 1000
    }
]

connected = {}


def find_user(user_name):
    for user in users:
        if (user['name'] == user_name):
            return user

    return None


def clean_users():
    n_users = users.copy()

    connect_names = [connected[key] for key in connected.keys()]

    for user in n_users:
        user.pop('password', None)
        if user['name'] in connect_names:
            user['status'] = 1
        else:
            user['status'] = 0

    return n_users


def sort_messages():
    global messages
    messages = sorted(messages, key=lambda k: k['time'])


@app.route('/')
def get_current_time():
    return 'Hello from Flask server'


@app.route('/login', methods=['POST'])
def login():
    body = request.get_json(force=True)
    name = body['name']
    pwd = body['pwd']

    found_user = find_user(name)

    if found_user:
        if found_user.password == pwd:
            return {'success': 'welcome'}
        else:
            return {'error': 'pwd is incorrect'}, 400
    else:
        return {'error': 'user not found'}, 400


@app.route('/register', methods=['POST'])
def register():
    body = request.get_json(force=True)
    name = body['name']
    pwd = body['pwd']

    if not name or not pwd:
        return {'error': 'please include name and pwd in request'}, 400

    found_user = find_user(name)

    if found_user:
        return {'error': 'user already exists'}, 400
    else:
        global users
        users.append({'name': name, 'password': pwd, 'status': 0})
        return {'success': 'user created'}


@app.route('/user', methods=['POST'])
def get_user():
    body = request.get_json(force=True)
    name = body['name']

    if not name:
        return {'error': 'please include name in body'}, 404

    found_user = find_user(name)
    if found_user:
        return {'success': 'the user exists'}
    else:
        return {'error': 'user not found'}, 404


@socketio.on('chat')
def handle_message(message):
    print('request', request)
    print('request.sid', request.sid)
    print('New message')
    message['time'] = time.time() * 1000
    print(message)
    global messages
    messages.append(message)
    sort_messages()
    emit('chat', message, broadcast=True)


@socketio.on('connect')
def handle_connect():
    # t: parameter to interpret
    # get name
    print('Client connected')
    print('request', request)
    print('socketio', socketio)

    print('request.sid', request.sid)

    print('rooms', rooms())

    name = unquote(request.args.get('name'))
    print('name', name)

    global connected
    connected[request.sid] = name

    safe_users = clean_users()
    print('safe_users', safe_users)
    emit('users', safe_users, broadcast=True)
    emit('messages', messages)


@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')
    print('request.sid', request.sid)

    global connected
    connected.pop(request.sid, None)

    emit('users', clean_users(), broadcast=True)


if __name__ == '__main__':
    socketio.run(app)
