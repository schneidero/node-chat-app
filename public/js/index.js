var socket = io();

socket.on('connect', () => {
    console.log('Connected to Server');

    socket.emit('createEmail', {
        to: 'jonas@schn.com',
        message: 'hello'
    })

    socket.emit('createMessage', {
        to: 'mama@mm.com',
        text: 'hello mom'
    })
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newEmail', function(email) {
    console.log('New Email received', email);
});

socket.on('newMessage', function(message) {
    console.log('new Message received', message);
})