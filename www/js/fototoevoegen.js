/* jshint
browser: true,
devel: true,
jquery: true
*/
/*
global device
*/
var pictureSource; // picture source
var destinationType; // sets the format of returned value 

$(document).ready(function () {
	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/) && typeof device !== "undefined") {
		document.addEventListener("deviceready", onDeviceReady, false);
	} else {
		onDeviceReady();
	}
});

function onDeviceReady() {
	//alert('deviceready');
	document.getElementById("add_photo").addEventListener("click", takePicture, false);
	//alert('jo');
}

function takePicture(e) {
	if (!navigator.camera) {
		alert("no camera!");
	} else {
		navigator.camera.getPicture(onSuccess, onFail, {
			quality: 50,
			destinationType: navigator.camera.DestinationType.DATA_URL,
			allowEdit: true,
			correctOrientation: true
		});
	}
}

function onSuccess(imageData) {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var imageObj = document.getElementById("myImage");
	var width;
	imageObj.src = "data:image/jpeg;base64," + imageData;

	width = imageObj.width;

	canvas.setAttribute('width', width);
	canvas.setAttribute('height', width);
	context.drawImage(imageObj, 0, 0, width, width, 0, 0, width, width);
	var dataURL = canvas.toDataURL();
	document.getElementById("defImg").setAttribute('crossOrigin', 'anonymous');
	document.getElementById("defImg").src = dataURL;
}

function onFail(message) {
	//setTimeout(function () {}, 0);

}