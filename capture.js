const width = 320;
const height = 0;
const streaming = false;

let imageUrl = new Map();
let obj = {};

let captureBtns = document.querySelectorAll('.capture');
captureBtns.forEach((d, index) => {
    d.addEventListener('click', () => {
        handlecamera(d, `cameraid${index}`);
    });
});


const generateCameraViewPort = (id) => {
    const cameraVideo = document.createElement('video');
    cameraVideo.setAttribute('id', id);
    cameraVideo.setAttribute('height', '60%');
    cameraVideo.setAttribute('width', '60%');
    cameraVideo.style.borderRadius = '50%';
    return cameraVideo;
}

const handlecamera = (d, id) => {
    let cameraContainer = d.parentElement.querySelector('.camera');
    if (!!cameraContainer) {
        if (!cameraContainer.contains(document.querySelector('video'))) {
            cameraContainer.innerHTML = null;
            const cameraViewPort = generateCameraViewPort(id);
            cameraContainer.append(cameraViewPort);
            openCamera(d, cameraViewPort, cameraContainer, id);
        } else {
            console.log('Already an instance is running with the existing ID');
        }
    }
}


const openCamera = (captureBtn, video, cameraContainer, id) => {
    captureBtn.innerHTML = 'Capture Image';
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
            captureBtn.addEventListener('click', () => {
                captureImage(captureBtn, video, cameraContainer, id, stream);
                stopStream(stream);
            });
        })
        .catch(function (err) {
            console.log('An error occurred: ' + err);
        });

}

const stopStream = (stream) => {
    stream.getVideoTracks().forEach((track) => {
        track.stop();
    });
}

const captureImage = (captureBtn, video, cameraContainer, id) => {
    let imageCanvas = document.createElement('canvas');
    imageCanvas.height = '150';
    imageCanvas.width = '180';
    imageCanvas.style.borderRadius = '50%';
    imageCanvas.setAttribute('id', 'picCanvas');
    cameraContainer.append(imageCanvas);
    let ctx = imageCanvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 200, 200);
    let data = imageCanvas.toDataURL('image/png');

    imageUrl.set(`${id}`, data);

    // console.log(imageUrl);
    obj = Array.from(imageUrl).reduce((obj, [key, value]) => (
        Object.assign(obj, { [key]: value })
    ), {});

    captureBtn.innerHTML = "Recapture";
    captureBtn.removeEventListener('click', handlecamera);
    captureBtn.addEventListener('click', () => {
        location.reload();
    });
    cameraContainer.querySelector('video').style.display = 'none';
}

document.getElementById('decide').addEventListener('click', () => {
    saveprofilepics(obj);
});

function saveprofilepics(obj) {
    if (localStorage.getItem('details') === null) {
        let userDetails = [];
        userDetails.push(obj);
        localStorage.setItem('details', JSON.stringify(userDetails));
    } else {
        let userDetails = JSON.parse(localStorage.getItem('details'));
        userDetails.push(obj);
        localStorage.setItem('details', JSON.stringify(userDetails));
    }
    document.getElementById('profilepic1').src = obj.cameraid0;
    document.getElementById('profilepic2').src = obj.cameraid1;
    document.getElementById('profilepic3').src = obj.cameraid2;
}