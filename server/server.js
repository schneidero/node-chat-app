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

    socket.emit('newEmail', {
        from: 'Mike@email.com',
        message: 'Hello schneider come see me',
        createdAt: '5 pm Novemver 12th 2016'
    });

    socket.emit('newMessage', {
        from: 'newMessage@message.com',
        message: 'Jonny@john.com',
        createdAt: 'instant'
    });



    socket.on('createEmail', (emailData) => {

        console.log('Create Email', emailData);
    });

    socket.on('createMessage', (message) => {
        console.log('create and send a message', message);
        message.createdAt = 'June 2019 4:am';
        socket.emit('newMessage', message);
        console.log('sending message', message);
    })
});





server.listen(port, () => {
    console.log(`server is up on port ${port}`);
});