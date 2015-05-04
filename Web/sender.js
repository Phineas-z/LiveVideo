var FPS = 30;

var video = document.querySelector('video'),
	render = document.querySelector('#render'),
	receiver = document.querySelector('#receiver'),
	renderContext = render.getContext('2d'),
	receiverContext = receiver.getContext('2d'),
	ws = null,
	width = 0, // actual video size to render
	height = 0;

navigator.getUserMedia = navigator.webkitGetUserMedia;

navigator.getUserMedia({
	'audio': false,
	'video': true
}, function(stream){
	video.src = URL.createObjectURL(stream);

}, function(err) {
	alert(err);

});

video.addEventListener('play', function() {
	setInterval(function() {
		var width = 200;
		var height = 200 * video.videoHeight / video.videoWidth;
	
		renderContext.drawImage(video, 0, 0, width, height);
		var img = renderContext.getImageData(0, 0, width, height);
		var binary = new Uint8Array(img.data.length);
		for (var i = 0; i <= img.data.length-1; i++) {
			binary[i] = img.data[i];
		}
		
		if (ws) {
			ws.send(binary.buffer);
		}

	}, 1000 / FPS);
});

ws = new WebSocket('ws://localhost:8888');
ws.binaryType = 'arraybuffer';

ws.onopen = function() {
	console.log('ws open');
}

ws.onmessage = function(e) {
	var binary = new Uint8Array(e.data);
	var img = receiverContext.createImageData(200, 200);
	for (var i = 0; i <= img.data.length-1; i++) {
		img.data[i] = binary[i];
	}
	receiverContext.putImageData(img, width, height);
}

ws.onclose = function() {
	console.log('ws close');
}

