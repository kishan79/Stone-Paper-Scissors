let camBtn1 = document.getElementById('cambutton1');
camBtn1.addEventListener('click',()=>{
    let dimg1 = document.getElementById('defaultImg1');
    let video1 = document.getElementById('video1');
    startup(camBtn1,dimg1,video1);
});

let camBtn2 = document.getElementById('cambutton2');
camBtn2.addEventListener('click', ()=>{
    let dimg2 =  document.getElementById('defaultImg2');
    let video2 = document.getElementById('video2');
    startup(camBtn2,dimg2,video2);
});

let camBtn3 = document.getElementById('cambutton3');
camBtn3.addEventListener('click',()=>{
    let dimg3 =  document.getElementById('defaultImg3');
    let video3 = document.getElementById('video3');
    startup(camBtn3,dimg3,video3);
});


var width = 320;
var height = 0;

var streaming = false;

var video = null;

function startup(camBtn,dimg,video) {
    // console.log(e.target);
    camBtn.innerHTML = "Capture Image";
    dimg.style.display = "none";
    video.style.display = "block";

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function (err) {
            console.log("An error occurred: " + err);
        });

    video.addEventListener('canplay', function (ev) {
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);
            streaming = true;
        }
    }, false);

    camBtn.addEventListener('click', () => {
        takepicture(dimg,video,camBtn);
        video.style.display = "none";

    });
}

function takepicture(placeHolder,video,camBtn) {
    placeHolder.style = null;
    // placeHolder.classList = [];
    placeHolder.innerHTML = null;
    let pic_canvas = document.createElement('canvas');
    pic_canvas.height = "150";
    pic_canvas.width = "180"
    placeHolder.append(pic_canvas);


    var ctx = pic_canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 200, 200);
    var data = pic_canvas.toDataURL('image/png');

    placeHolder.src = data;
    // dimg.style.height = "150px";
    // dimg.style.width = "180px";
    placeHolder.style.borderRadius = "50%";

    placeHolder.style.height = "60%";
    placeHolder.style.width = "60%";

    camBtn.innerHTML = "Recapture";
}
