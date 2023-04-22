function restart() {
    const video = document.getElementById('videoPlayer');
    video.currentTime = 0;
    play();
}
function play() {
    const video = document.getElementById('videoPlayer');
    const button = document.getElementById('play');
    if (video.paused) {
        video.play();
        button.textContent = "||";
    } else {
        video.pause();
        button.textContent = ">";
    }
}
function skip(value) {
    const video = document.getElementById('videoPlayer');
    video.currentTime += value;
}
function loadVideoList() {
const xhr = new XMLHttpRequest();
xhr.open('GET', '/videos');
xhr.onload = function () {
  if (xhr.status === 200) {
    const videos = JSON.parse(xhr.responseText);
    const videoList = document.getElementById('videoList');
    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = video.name;
      a.href = '#';
      a.addEventListener('click', function () {
        const videoPlayer = document.getElementById('videoPlayer');
        const playButton = document.getElementById('play');
        const nameholder = document.getElementById('name');
        nameholder.textContent = video.name;
        videoPlayer.src = '/play?video=' + encodeURIComponent(video.path);
        play();
      });
      li.appendChild(a);
      videoList.appendChild(li);
    }
  } else {
    console.error('Failed to load video list');
  }
};
xhr.send();
}