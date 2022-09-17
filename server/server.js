// *** Imports ***
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

// * Import Functions *
const tools = require("./sudokuTools");



// *** Server Creation ***
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// *** Port Settings ***
const defaultPort = 3000;
const port = process.env.PORT || defaultPort;



// *** Path Setup ***
// * Note the '/..' in the path so the server can access the 'public' directory *
const publicDirectoryPath = path.join(__dirname, '/../public');
app.use(express.static(publicDirectoryPath));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/../index.html');
});

// ***** Global Variables *****

// ***** SocketIO Events *****
io.on('connection', function(socket) {
    console.log(`User Connected with id: [${socket.id}]`);



    // User Disconnection Event
    socket.on('disconnect', function() {
        console.log(`User Disconnected with id: [${socket.id}]`);
    });

    // Solve
    socket.on('solve', function(puzzle) {
        tools.solve(puzzle, io, socket.id)
    });



});



// ***** Listen to Port ******
server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
})



/*  *** Important Info ***
    npm install –save express
    npm install -save socket.io

    *** Commands ***
    node server/server.js  -> run server
    ctrl + c        -> stop server


    *** Testing ***
    http://localhost:3000


*/