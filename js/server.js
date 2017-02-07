var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
		id: 1,
		text: "Bienvenidos a mi chat",
		author: "Luis Miguel Alvarez"}];


app.use(express.static('public'));

app.get('/', function(req, res){
	res.status(200).send("hola mundo!");
});

io.on('connection', function(socket){
	console.log('Alguien se ha conectado con Socket');
	socket.emit('messages', messages);

	socket.on('new-message', function(data){
		messages.push(data);

		io.sockets.emit('messages',messages);

	});
});

server.listen(8000, function(){
	console.log("Servidor corriendo en http:/localhost:8000");
	});
