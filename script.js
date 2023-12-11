const mainVideoUpload = document.getElementById("main-video-upload");
const otherVideosUpload = document.getElementById("other-videos-upload");
const mainVideo = document.getElementById("main-video");
let otherVideos = document.getElementById("other-videos");


var videoPlayers = {};
videoPlayers["main_video"] = "";
var speed = mainVideo.playbackRate

// Upload main videos event listeners
mainVideoUpload.addEventListener("change", function() {
  if (this.files && this.files[0]) {
    // Start paused
    var url = URL.createObjectURL(this.files[0]);
    mainVideo.src = url;
    pauseVideo(mainVideo.id); // Pause the video initially
    videoPlayers["main_video"] = mainVideo;
  }
});

// Upload sub videos event listeners
otherVideosUpload.addEventListener("change", function() {
  // Clear existing videos
  otherVideos.innerHTML = "";

  if (this.files) {
    for (let i = 0; i < this.files.length; i++) {
      var url = URL.createObjectURL(this.files[i]);
      var videoId = "video" + i;
      createVideoPlayer(videoId, url);
    }
  sync_videos()
  }
});

function createVideoPlayer(videoId, url) {
  var videoPlayer = document.createElement("video");
  videoPlayer.id = videoId;
  videoPlayer.src = url;
  videoPlayer.controls = false; // Show video controls
  otherVideos.appendChild(videoPlayer);
  videoPlayers[videoId] = videoPlayer;
  changeSpeed(videoId)
  pauseVideo(videoId); // Pause the video initially

  // Create a new checkbox for this video player
  var checkbox = createCheckbox(videoId);

  // Create a new label for this checkbox
  createLabel(videoId);

  // Add an event listener to the checkbox
  addCheckboxEventListener(checkbox);
}

function sync_videos() {
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

function createCheckbox(videoId) {
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = videoId;
  checkbox.value = videoId;
  checkbox.checked = true;
  checkboxes.appendChild(checkbox);
  return checkbox;
}

function createLabel(videoId) {
  var label = document.createElement("label");
  label.textContent = videoId;
  checkboxes.appendChild(label);
}

function addCheckboxEventListener(checkbox) {
  checkbox.addEventListener("change", checked_video);
}

// Create checkboxes for each video in the videos array
for (var i = 0; i < otherVideos.length; i++) {
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = sub_videos[i].id;
  checkbox.value = sub_videos[i].id;

  var label = document.createElement("label");
  label.textContent = sub_videos[i].id;

  checkboxes.appendChild(checkbox);
  checkboxes.appendChild(label);
  checkboxes.appendChild(sub_videos[i].input); // Append the file input element to the checkboxes div

  checkbox.addEventListener("change", checked_video);
}


// Bottom controls
const checkboxes = document.getElementById("checkboxes");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const firstFrameButton = document.getElementById("first-frame");
const lastFrameButton = document.getElementById("last-frame");
const increaseSpeedButton = document.getElementById("increase-speed");
const decreaseSpeedButton = document.getElementById("decrease-speed");
const stopButton = document.getElementById("stop");


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
        videoPlayers[videoId].style.display = "block";
    }
    else {
        videoPlayers[videoId].style.display = "none";
    }

    // Check if there is more than one video selected
    if(otherVideos.children.length > 1) {
      //
      console.log('event', otherVideos.children)
      otherVideos.classList.add('more-than-one')
    } else otherVideos.classList.remove('more-than-one')
   sync_videos()
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

const jumpFrameInput = document.getElementById("jump-frame");
const jumpButton = document.getElementById("jump");

jumpButton.addEventListener("click", function() {
  const jumpFrame = parseInt(jumpFrameInput.value, 10);

  if (!isNaN(jumpFrame)) {
    for (const videoId in videoPlayers) {
      if (videoPlayers[videoId]) {
        // Assuming a frame rate of 30 frames per second, you can adjust this value as needed
        const frameRate = 30;
        const jumpTime = jumpFrame / frameRate;
        videoPlayers[videoId].currentTime = jumpTime;
        pauseVideo(videoId); // Pause the video

      }
    }
  }
});

// Add an event listener to handle Enter key press in the text box
jumpFrameInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    jumpButton.click(); // Trigger the "jump" button click event
  }
});



const previousFrameButton = document.getElementById("previous-frame");
const nextFrameButton = document.getElementById("next-frame");

previousFrameButton.addEventListener("click", function() {
  for (const videoId in videoPlayers) {
    if (videoPlayers[videoId]) {
      videoPlayers[videoId].currentTime -= 1 / 30; // Assuming a frame rate of 30 fps
      pauseVideo(videoId); // Pause the video

    }
  }
});

nextFrameButton.addEventListener("click", function() {
  for (const videoId in videoPlayers) {
    if (videoPlayers[videoId]) {
      videoPlayers[videoId].currentTime += 1 / 30; // Assuming a frame rate of 30 fps
      pauseVideo(videoId); // Pause the video

    }
  }
});
