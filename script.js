const mainVideo = document.getElementById("main-video");
mainVideo.controls = false; 

var videoPlayers = {};
videoPlayers[mainVideo.id] = mainVideo;
var speed = mainVideo.playbackRate

const videos = [
{
        id: "1",
        src: "1.mp4"
      },
  {
        id: "2",
        src: "1.mp4"
  },
  {
        id: "3",
        src: "1.mp4"
  },
  {
        id: "4",
        src: "1.mp4"
  },

];

const checkboxes = document.getElementById("checkboxes");
const otherVideos = document.getElementById("other-videos");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const firstFrameButton = document.getElementById("first-frame");
const lastFrameButton = document.getElementById("last-frame");
const increaseSpeedButton = document.getElementById("increase-speed");
const decreaseSpeedButton = document.getElementById("decrease-speed");
const stopButton = document.getElementById("stop");

function createVideoPlayer(videoId) {
  var videoPlayer = document.createElement("video");
  videoPlayer.id = videoId;
  videoPlayer.src = videos.find(video => video.id === videoId).src;
  videoPlayer.controls = false; // Show video controls

  otherVideos.appendChild(videoPlayer);
  videoPlayers[videoId] = videoPlayer;
}

function playVideo(videoId) {
  if (videoPlayers[videoId]) {
    videoPlayers[videoId].play();
  }
}

function pauseVideo(videoId) {
  if (videoPlayers[videoId]) {
    videoPlayers[videoId].pause();
  }
}

function goToFirstFrame(videoId) {
  if (videoPlayers[videoId]) {
    videoPlayers[videoId].currentTime = 0;
  }
}

function goToLastFrame(videoId) {
  if (videoPlayers[videoId]) {
    videoPlayers[videoId].currentTime = videoPlayers[videoId].duration;
  }
}
function changeSpeed(videoId){
    if (videoPlayers[videoId]) {
        videoPlayers[videoId].playbackRate = speed;
      }
}

function checked_video(event) {
    var videoId = event.target.value;
  
    if (event.target.checked) {
      if (videoId !== mainVideo.id) {
        createVideoPlayer(videoId);
        pauseVideo(videoId); // Pause the video initially
      }
    } else {
      otherVideos.removeChild(videoPlayers[videoId]);
      delete videoPlayers[videoId];
    }

    if(otherVideos.children.length > 1) {
      console.log('event', otherVideos.children)
      otherVideos.classList.add('more-than-one')
    } else otherVideos.classList.remove('more-than-one')
  
    var mainVideoPaused = mainVideo.paused;
  
    for (const id in videoPlayers) {
      goToFirstFrame(id);
      changeSpeed(id)
      if (mainVideoPaused) {
        pauseVideo(id);
      } else {
        playVideo(id);
      }
    }
  }

for (var i = 0; i < videos.length; i++) {
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = videos[i].id;
  checkbox.value = videos[i].id;

  var label = document.createElement("label");
  label.textContent = videos[i].id;

  checkboxes.appendChild(checkbox);
  checkboxes.appendChild(label);
  
  checkbox.addEventListener("change",checked_video);

}


playButton.addEventListener("click", function() {
  for (const videoId in videoPlayers) {
    playVideo(videoId);
  }
});

pauseButton.addEventListener("click", function() {
  for (const videoId in videoPlayers) {
    pauseVideo(videoId);
  }
});

firstFrameButton.addEventListener("click", function() {
  for (const videoId in videoPlayers) {
    goToFirstFrame(videoId);
    pauseVideo(videoId);
  }
});

lastFrameButton.addEventListener("click", function() {
  for (const videoId in videoPlayers) {
    goToLastFrame(videoId);
  }
});

increaseSpeedButton.addEventListener("click", function() {
  speed += 0.1
  for (const videoId in videoPlayers) {
    changeSpeed(videoId);
  }
});

decreaseSpeedButton.addEventListener("click", function() {
  speed -= 0.1
  for (const videoId in videoPlayers) {
    changeSpeed(videoId);
  }
});

