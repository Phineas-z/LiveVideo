var canvas = document.querySelector('canvas'),
	context = canvas.getContext('2d'),
	wsURL = 'ws://' + window.location.host.split(':')[0] + ':8888',
	ws = new WebSocket(wsURL);

ws.binaryType = 'arraybuffer';

ws.onopen = function() {
	console.log('ws open');
}

ws.onmessage = function(e) {
	var binary = new Uint8Array(e.data);
	var img = context.createImageData(200, 200);
	
	for (var i = 0; i <= img.data.length-1; i++) {
		img.data[i] = binary[i];
	}
	
	context.putImageData(img, 0, 0);
}

ws.onclose = function() {
	console.log('ws close');
}
