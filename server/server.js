const path = require('path');

const http = require('http');

const express = require('express');

const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User connected');


    socket.on('disconnect', () => {
        console.log('User is disconnected');
    });

    // socket.emit('newEmail', {
    //     from: 'Mike@email.com',
    //     message: 'Hello schneider come see me',
    //     createdAt: '5 pm Novemver 12th 2016'
    // });

    socket.emit('newMessage', {
        from: 'Admin',
        message: 'Welcome to the chat app',
        createdAt: new Date().getTime()

    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        message: 'User has joined the chat',
        createdAt: new Date().getTime()
    })



    socket.on('createEmail', (emailData) => {

        console.log('Create Email', emailData);
    });

    socket.on('createMessage', (message) => {
        message.createdAt = new Date().getTime();
        socket.broadcast.emit('newMessage', message);
        console.log('sending message', message);
    })
});





server.listen(port, () => {
    console.log(`server is up on port ${port}`);
});