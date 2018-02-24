var wsUrl = 'ws://localhost:8092'

var socket = new WebSocket(wsUrl)
socket.binaryType = 'arraybuffer'
socket.onopen = function(event) {
	console.log(event);
}

socket.onmessage = function(event) {
	console.log(event.data);
}

setTimeout(function() {
	socket.send('我从客户端来的')
}, 3000);