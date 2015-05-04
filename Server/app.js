var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({port: 8888});

wss.on('connection', function(ws) {
	ws.on('message', function(message) {
		wss.broadcast(message);
	});
});

wss.broadcast = function(data) {
	wss.clients.forEach(function(client) {
		client.send(data);
	});
}
