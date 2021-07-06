const io = require('socket.io')(4000, {
    cors: {
        origin: ["http://localhost:4000"]
    }
})

io.on('connection', socket => {
    console.log('hi');
})
console.log('aaa')