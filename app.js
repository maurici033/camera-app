// Set constraints for the video stream
var constraints = { video: { facingMode: "user", width: 500, height: 500 }, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0,500,500);
    cameraOutput.width = cameraView.videoWidth;
    cameraOutput.height = cameraView.videoHeight;
    cameraOutput.src = cameraSensor.toDataURL("image/webp");

    //cameraOutput.classList.add("taken");
    // track.stop();
};

function uploadEx() {
                var canvas = document.getElementById("camera--sensor");
                var dataURL = canvas.toDataURL("image/jpeg");
                document.getElementById('hidden_data').value = dataURL;
                var fd = new FormData(document.forms["form1"]);

                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'upload_data.php', true);

                xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        var percentComplete = (e.loaded / e.total) * 100;
                        console.log(percentComplete + '% uploaded');
                        alert('Succesfully uploaded');
                    }
                };

                xhr.onload = function() {

                };
                xhr.send(fd);
            };

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);