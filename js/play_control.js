const audioPlayer = document.getElementById("audioPlayer");
const lyricsElement = document.getElementById("lyrics");
let currentSongIndex = 0;

//处理用户输入
//function userEnter() {
//	currentSongIndex = document.getElementById("userEnter").value - 1;
//}

// 加载并显示当前歌曲的歌词
function loadLyrics() {
    const lyricsFile = fileList[currentSongIndex].replace(".mp3", ".lrc");
    fetch(lyricsFile).then((response)=>response.text()).then((data)=>{
        // 清空之前的歌词
        lyricsElement.innerHTML = "";

        // 解析歌词数据
        const lines = data.split("\n");
        const regex = /\[(\d{2}):(\d{2})(\.\d{2,3})?](.+)/;

        // 将歌词显示到页面
        lines.forEach((line)=>{
            const matches = regex.exec(line);
            if (matches) {
                const minutes = parseFloat(matches[1]);
                const seconds = parseFloat(matches[2]);
                const milliseconds = parseFloat(matches[3]) || 0;
                const text = matches[4];

                const time = minutes * 60 + seconds + milliseconds / 1000;
                const span = document.createElement("span");
                span.textContent = text;
                span.setAttribute("data-time", time);
                span.setAttribute("class", "lyric-line");
                const lineBreak = document.createElement("br");
                lyricsElement.appendChild(span);
                lyricsElement.appendChild(lineBreak);
            }
        }
        );
    }
    ).catch((error)=>{
        console.error("加载歌词文件时出现错误：", error);
        alert("加载歌词文件时出现错误：", error);
    }
    );
}

//随机播放实现
function randomPlay() {
    currentSongIndex = Math.floor(Math.random() * (fileList.length - 0 + 1)) + 0;
    audioplay();
}

let playMode = 0;
function playMod() {
	if (playMode == 0) {
		document.getElementById("playModButton").innerText = "随机播放";
		playMode = 1;
	} else {
		document.getElementById("playModButton").innerText = "顺序播放";
		playMode = 0;
	}
}

// 播放
function audioplay() {
    audioPlayer.src = fileList[currentSongIndex];
    document.getElementById("head").innerText = fileList[currentSongIndex].replace(decodeURIComponent(property.dir),"").replace(".mp3","");
    //document.getElementById("head2").innerText = "歌曲序号:" + (currentSongIndex + 1);
	audioPlayer.play();
    loadLyrics();
}

// 初始化第一首
audioplay();

// 播放下一首
function playNextSong() {
    if (currentSongIndex <= fileList.length - 2) {
		if (playMode == 0) {
			currentSongIndex = (currentSongIndex + 1) % fileList.length;
			audioplay();
		} else {
			randomPlay();
		}
    } else {
        alert("已经是最后一首!");
    }
}

// 播放上一首
function playPreviousSong() {
    if (currentSongIndex >= 1) {
		if (playMode == 0) {
			currentSongIndex = (currentSongIndex - 1) % fileList.length;
			audioplay();
		} else {
			randomPlay();
		}
    } else {
        alert("已经是第一首!");
    }
}

// 监听音频结束事件，当一首歌曲播放完毕后，自动播放下一首歌曲
audioPlayer.addEventListener("ended", playNextSong);

// 同步滚动歌词
audioPlayer.addEventListener("timeupdate", () => {
  const currentTime = audioPlayer.currentTime;
  const lyricLines = lyricsElement.getElementsByClassName("lyric-line");
  const lyricContainerHeight = lyricsElement.clientHeight;

  for (let i = 0; i < lyricLines.length; i++) {
    const line = lyricLines[i];
    const time = parseFloat(line.getAttribute("data-time"));
    const nextTime =
      i < lyricLines.length - 1
        ? parseFloat(lyricLines[i + 1].getAttribute("data-time"))
        : Number.POSITIVE_INFINITY;

    if (currentTime >= time && currentTime < nextTime) {
      line.classList.add("active");
      lyricsElement.scrollTop =
        line.offsetTop - lyricsElement.offsetTop - lyricContainerHeight / 2 + 15;
    } else {
      line.classList.remove("active");
    }
  }
});

// 点击歌词时跳转音频到对应时间
lyricsElement.addEventListener("click", (event)=>{
    const target = event.target;
    if (target.tagName === "SPAN") {
        const time = parseFloat(target.getAttribute("data-time"));
        audioPlayer.currentTime = time;
    }
}
);
