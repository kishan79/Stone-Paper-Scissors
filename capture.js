
let profile_pic = document.querySelectorAll('div.profile_pic_holder');
// console.log(profile_pic);
profile_pic.forEach((placeHolder)=>{
  placeHolder.addEventListener('click',()=>{
      takepicture(placeHolder);
    });
});


    var width = 320;
    var height = 0;   
  
    var streaming = false;
  
    var video = null;
  
    function startup() {
      video = document.getElementById('video');
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
  
          if (isNaN(height)) {
            height = width / (4 / 3);
          }
  
          video.setAttribute('width', width);
          video.setAttribute('height', height);
          streaming = true;
        }
      }, false);      
    }
    
    function takepicture(placeHolder) {
        placeHolder.style = null;
        placeHolder.classList = [];
        placeHolder.innerHTML=null;
        // let pic_placeholder = document.getElementsByClassName('profile_pic_holder');
        let pic_canvas = document.createElement('canvas');
        placeHolder.append(pic_canvas);
        

      var ctx = pic_canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, 200, 200);
        var data = pic_canvas.toDataURL('image/png');
        // console.log(data);

    }

    window.addEventListener('load', startup, false);
 