import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
import { createIcons, ArrowLeft, ArrowRight } from 'https://cdn.jsdelivr.net/npm/lucide@1.14.0/+esm';
import { ProgressBar } from "./progressbar.js";

const videoPath = "/videos/";

class App {
    constructor() {
        this.currentIdx = 0;
        this.video = null;
        this.progressBar = null;
    }

    async init() {
        createIcons({
            icons: {
                ArrowLeft,
                ArrowRight
            }
        })

        const container = document.getElementById("container");

        const prevButton = document.getElementById("prev_button");
        const nextButton = document.getElementById("next_button");
        prevButton.disabled = true;

        prevButton.addEventListener("click", () => {
            this.currentIdx -= 1;

            if (this.currentIdx === 0) {
                prevButton.disabled = true;
            }
            else {
                prevButton.disabled = false;
            }

            if (this.currentIdx === 3) {
                nextButton.disabled = true;
            }
            else {
                nextButton.disabled = false;
            }

            this.changeVideo();
        })

        nextButton.addEventListener("click", () => {
            this.currentIdx += 1;
            
            if (this.currentIdx === 0) {
                prevButton.disabled = true;
            }
            else {
                prevButton.disabled = false;
            }

            if (this.currentIdx === 3) {
                nextButton.disabled = true;
            }
            else {
                nextButton.disabled = false;
            }

            this.changeVideo();
        })
        
        const videoPlayer = document.getElementById("video_player");
        videoPlayer.controls = true;
        videoPlayer.autoplay = true;
        videoPlayer.loop = true;
        videoPlayer.muted = true;
        
        const videoSource = document.createElement("source");
        videoSource.id = "video_source"
        videoSource.src = videoPath + this.currentIdx;

        const videoTitle = document.getElementById("video_title");
        const videoInfo = document.getElementById("video_info");

        videoPlayer.addEventListener("loadedmetadata", () => {
            videoTitle.innerText = videoSource.src;
            videoInfo.innerText = "Video Length : " + videoPlayer.duration + " seconds";
            if (!this.progressBar) {
                this.progressBar = new ProgressBar(videoPlayer.duration);
                container.appendChild(this.progressBar.init());
            }
        })

        videoPlayer.addEventListener("timeupdate", () => {
            this.progressBar.update(videoPlayer.currentTime)
        })

        videoPlayer.appendChild(videoSource);
    }

    changeVideo() {
        const videoPlayer = document.getElementById("video_player");

        const videoSource = document.getElementById("video_source");
        videoSource.src = videoPath + this.currentIdx;

        videoPlayer.load()
    }
}

window.onload = async () => {
    await new App().init();
}