# chatroom

React web app with chat rooms in real-time for friends!

See it in action [here!](https://www.loom.com/share/0065f1a19f2e491586f1297fd01639aa)

## Functionalities
- Custom names for sign up
- Modern, yet simple design
- Login/Register
- Sidebar with list of users
- User statuses (online/offline)
- Send message in real-time (with websockets)
- View history when joining
- Time of message
- Sender of message
- Autoscroll to end of messages

## Approach
- The app is built with React on the front-end and Flask on the back-end
- For the chat functionality, I decided to go for websockets. The reason for this is because it created a birectional communication open with the server, which is best to accomplish the "real-time" aspect of the app
- I used the library flask_socketio to implement sockets in Flask
- In terms of UI components, I made use of the Ant Design library. It is well documented, the support online is vast, and the components are flexible (and beautiful!)
- For now, I decided not to implement any datase for storing the app data because of shortage of time
- I prioritized a good-looking app with a great UI and UX
- One of the more challenging aspects was to have the functionality of having who is online in "real-time" for this, I used the session ids contained in the request object after the socket connection. I then created a few data structures to store the current status of a user
- Had a lot of fun building this!

----

## Installation

Install dependencies
```
$ npm install
```

Start React app on dev mode
```
$ yarn start
```

Start python back-end
```
$ yarn start-api
```

Enjoy!
