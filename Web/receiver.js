var canvas = document.querySelector('canvas'),
	context = canvas.getContext('2d'),
	ws = new WebSocket('ws://10.0.1.24:8888');

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
