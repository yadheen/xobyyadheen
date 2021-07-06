if (process.env.NODE_ENV != "production") {
    require('dotenv').config({ path: '.env' });
}

const express = require('express');
const { SocketAddress } = require('net');
const app = express();





// app.set('view engine', 'html')
// app.set('views', path.join(__dirname, 'views'))

// app.use(express.static(__dirname + '/public'))





app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')

//.........................................................


const path = require('path')
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:4040"]
    }
});
var dict = {};

io.on('connection', socket => {

    socket.on('push', (cellindex, room_name) => {
        socket.to(room_name).emit('pull', cellindex)
    })
    socket.on('restart_event', (room_name) => {
        socket.to(room_name).emit('restart_event')
    })
    socket.on('join_room', room_name => {
        console.log(isNaN(dict[room_name]))

        // if (isNaN(dict[room_name])) {
        //     dict[room_name] = 1;
        //     // dict[room_name]++;

        //     socket.join(room_name);
        //     socket.emit('joined');


        // } else 
        // socket.join(room_name);


        // console.log(dict);
        // console.log(clients);
        // console.log(dict[room_name])
        if ((dict[room_name]) == undefined) {
            socket.join(room_name);
            socket.emit('joined');

            var clients = io.sockets.adapter.rooms.get(room_name);
            dict[room_name] = clients;
            console.log(dict[room_name])

        } else if (Object.keys(dict[room_name]).length < 2) {
            socket.join(room_name);
            // dict[room_name]++;
            socket.emit('joined');
            var clients = io.sockets.adapter.rooms.get(room_name);
            dict[room_name] = clients;
            console.log(dict);

            console.log(dict[room_name])



        } else {

            socket.emit("limit_alert");

        }


        // console.log(dict);
        // console.log(isNaN(dict[room_name]))
        // console.log(clients)
    })

    socket.on('disconnect', () => {

        // dict.forEach(i => {
        //         i.forEach(j => {
        //             if (j == socket.id) {
        //                 delete j;
        //             }
        //         })
        //     })
        // dict[room_name];
        for (var key in dict) {
            for (var i in dict[key]) {
                if (i == socket.id) {
                    delete i;
                    var temp = key;
                }
            }
        }
        socket.to(key).emit('leave_event');

        //  socket.to(key).emit('disconnect_event',key);

        console.log(dict)

        // socket.to(room_name).emit('disconnect_event', room_name);
        // socket.to(room_name).emit('leave_event');

        // socket.leave(room_name);




    })
    socket.on('leave_event', (room_name) => {
            for (var key in dict) {
                for (var i in dict[key]) {
                    if (i == socket.id) {
                        // console.log(i)
                        delete i;
                    }
                }
            }
            // dict[room_name]--;
            socket.to(room_name).emit('leave_event');
            socket.leave(room_name);
            console.log(dict);
            console.log(dict[room_name]);

            console.log("un");


        })
        // console.log(dict);
        // console.log()
        // socket.on('refresh', (room_name) => {
        //         socket.to(room_name).emit('refresh', room_name);
        //         dict[room_name]--;
        //         console.log("app");
        //         console.log(dict[room_name]);
        //     })
        // if (!(socket.connected)) {
        //     dict[room_name]--;
        // }
})


// io.on('disconnection', socket => {
//     dict[room_name]--;
// })




//.........................................................
app.get('/online', async(req, res) => {
    res.render('ticonline');
})

app.get('/', async(req, res) => {
    res.render('ticlocal')
        // res.json({ error: err })
});

app.use((req, res, next) => {
    res.send('not found');
    console.log('not found');
})
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("on the port")
})