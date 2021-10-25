const express = require('express');
const morgan = require('morgan');
const http = require('http');
require('dotenv').config();

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT | 8080;

app.use(morgan('dev'));
app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    await res.render('index');
});

let messages = [];

io.on('connection', socket => {
    console.log('socket connected');

    for(let msg of messages){
        socket.emit('send message', msg);
    }

    socket.on('send message', data => {
        console.log(data);
        messages.push(data);
        socket.emit('send message', data);
        socket.broadcast.emit('send message', data);
    });

    socket.on('disconnect', () => {
        console.log('socket disconnected');
    });
});

server.listen(port, () => console.log('Server started at http://localhost:' + port));