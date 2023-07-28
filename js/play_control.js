const audioPlayer = document.getElementById("audioPlayer");
const lyricsElement = document.getElementById("lyrics");
var audioList;
let currentSongIndex = 0;

// 加载并显示当前歌曲的歌词
function loadLyrics() {
  const lyricsFile = audioList[currentSongIndex].replace(".mp3", ".lrc");
  fetch(lyricsFile)
    .then((response) => response.text())
    .then((data) => {
      // 清空之前的歌词
      lyricsElement.innerHTML = "";

      // 解析歌词数据
      const lines = data.split("\n");
      const regex = /\[(\d{2}):(\d{2})(\.\d{2,3})?](.+)/; // 修改正则表达式

      // 将歌词显示到页面
      lines.forEach((line) => {
        const matches = regex.exec(line);
        if (matches) {
          const minutes = parseFloat(matches[1]);
          const seconds = parseFloat(matches[2]);
          const milliseconds = parseFloat(matches[3]) || 0; // 支持三位毫秒位
          const text = matches[4];

          const time = minutes * 60 + seconds + milliseconds / 1000; // 更新时间解析逻辑
          const span = document.createElement("span");
          span.textContent = text;
          span.setAttribute("data-time", time);

          const lineBreak = document.createElement("br");
          lyricsElement.appendChild(span);
          lyricsElement.appendChild(lineBreak);
        }
      });
    })
    .catch((error) => {
      console.error("加载歌词文件时出现错误：", error);
      alert("加载歌词文件时出现错误：", error);
    });
}

// 播放
function audioplay() {
  audioPlayer.src = audioList[currentSongIndex];
  document.getElementById("head").innerText = audioList[currentSongIndex];
  audioPlayer.play();
  loadLyrics();
}

// 初始化第一首
audioplay();

// 播放下一首
function playNextSong() {
  if (currentSongIndex <= audioList.length - 2) {
    currentSongIndex = (currentSongIndex + 1) % audioList.length;
    audioplay();
  } else {
    alert("已经是最后一首!");
  }
}

// 播放上一首
function playPreviousSong() {
  if (currentSongIndex >= 1) {
    currentSongIndex = (currentSongIndex - 1) % audioList.length;
    audioplay();
  } else {
    alert("已经是第一首!");
  }
}

// 监听音频结束事件，当一首歌曲播放完毕后，自动播放下一首歌曲
audioPlayer.addEventListener("ended", playNextSong);

// 同步滚动歌词
audioPlayer.addEventListener("timeupdate", () => {
  const currentTime = audioPlayer.currentTime;
  const spans = lyricsElement.getElementsByTagName("span");

  for (let i = 0; i < spans.length; i++) {
    const span = spans[i];
    const time = parseFloat(span.getAttribute("data-time"));
    const nextTime =
      i < spans.length - 1
        ? parseFloat(spans[i + 1].getAttribute("data-time"))
        : Number.POSITIVE_INFINITY;

    if (currentTime >= time && currentTime < nextTime) {
      span.style.color = "red";
      lyricsElement.scrollTop = span.offsetTop - lyricsElement.offsetTop;
    } else {
      span.style.color = "black";
    }
  }
});

// 点击歌词时跳转音频到对应时间
lyricsElement.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName === "SPAN") {
    const time = parseFloat(target.getAttribute("data-time"));
    audioPlayer.currentTime = time;
  }
});

