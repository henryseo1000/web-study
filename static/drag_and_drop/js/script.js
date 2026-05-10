import "https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.js"
import { parseBlob } from 'https://cdn.jsdelivr.net/npm/music-metadata-browser@2.5.11/+esm';
import { createIcons, Play, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, CirclePlus, Pause, X, Menu } from 'https://cdn.jsdelivr.net/npm/lucide@1.14.0/+esm';
import { Tooltip } from "./tooltip.js";
import { DragDrop } from "./dragdrop.js";
import { Drawer } from "./drawer.js";

class App {
    constructor() {
        this.tooltip = new Tooltip([
            {
                id : "album_area",
                text: "앨범 아트 영역"
            },
            {
                id : "album_img",
                text: "앨범 아트"
            },
            {
                id : "music_title",
                text: "음악 제목 영역"
            },
            {
                id : "artist_name",
                text: "아티스트 정보"
            },
            {
                id : "container",
                text: "음악 플레이어"
            },
            {
                id : "music_audio",
                text: "재생바"
            },
            {
                id: "empty",
                text: "드래그 & 드롭 영역"
            },
            {
                id: "file_list",
                text: "드래그 & 드롭 영역"
            }
        ]);

        this.dragdrop = new DragDrop();
        this.drawer = new Drawer();
        this.currentAudioIdx = 0;
        this.audios = [];
        this.nowPlaying = new Audio();
    }

    init() {
        createIcons({
            icons: {
                Play,
                ChevronLeft,
                ChevronRight,
                ChevronDown,
                ChevronUp,
                Pause,
                CirclePlus,
                X,
                Menu
            }
        })

        const chevronDown = document.querySelector('svg[data-lucide="chevron-down"]');
        const chevronUp = document.querySelector('svg[data-lucide="chevron-up"]');
        const container = document.getElementById("container");
        const dragDropContainer = document.getElementById("drag_drop_container");
        const uploadButton = document.getElementById("upload_button");
        const menu = document.querySelector("svg[data-lucide='menu']");
        const play = document.querySelector("svg[data-lucide='play']");
        const pause = document.querySelector("svg[data-lucide='pause']");
        const chevronRight = document.querySelector("svg[data-lucide='chevron-right']");
        const chevronLeft = document.querySelector("svg[data-lucide='chevron-left']");
        const playBar = document.getElementById("play_bar");
        const currentTime = document.getElementById("current_time");
        const totalTime = document.getElementById("total_time");

        chevronDown.addEventListener("click", () => {
            container.style.transform = "translate(0%, -200%)"
            dragDropContainer.style.transform = "none"
        })

        chevronUp.addEventListener("click", () => {
            container.style.transform = "none"
            dragDropContainer.style.transform = "translate(0%, 200%)"
        })

        menu.addEventListener("click", () => {
            this.drawer.open();
        })

        uploadButton.addEventListener("click", () => {
            this.uploadAudio();
        })

        play.addEventListener("click", () => {
            this.play();
        })

        pause.addEventListener("click", () => {
            this.pause();
        })

        chevronRight.addEventListener("click", () => {
            this.next();
        })

        chevronLeft.addEventListener("click", () => {
            this.prev();
        })

        this.nowPlaying.addEventListener("ended", () => {
            this.next();
        })

        this.nowPlaying.addEventListener("timeupdate", (e) => {
            playBar.value = e.target.currentTime;
            playBar.setAttribute("max", e.target.duration);
            currentTime.innerText = this.convertSeconds(e.target.currentTime);
            totalTime.innerText = this.convertSeconds(e.target.duration);
        })

        playBar.addEventListener("input", () => {
            this.nowPlaying.currentTime = playBar.value;
        })

        this.tooltip.init();
        this.dragdrop.init();
        this.drawer.init();
        playBar.value = 0;
        this.isPlaying = false;
    }

    convertSeconds(seconds) {
        var buf = "";
        const minutes = Math.floor(seconds / 60);
        const leftSeconds = Math.floor(seconds % 60);

        if (minutes > 9) {
            buf += minutes + ":";
        }
        else {
            buf += "0" + minutes + ":";
        }

        if (leftSeconds > 9) {
            buf += leftSeconds;
        }
        else {
            buf += "0" + leftSeconds;
        }

        return buf;
    }

    uploadAudio() {
        const files = this.dragdrop.getfiles();

        files.forEach((audioFile) => {
            const fileReader = new FileReader();
    
            fileReader.addEventListener("loadend", (e) => {
                this.audios.push({
                    blob : e.target.result,
                    title : audioFile.name
                });
                this.drawer.update(this.audios);
            })

            fileReader.readAsDataURL(audioFile);
        })

        this.dragdrop.setFiles([]);
        this.drawer.open();
    }

    play() {
        const play = document.querySelector("svg[data-lucide='play']");
        const pause = document.querySelector("svg[data-lucide='pause']");
        const musicTitle = document.getElementById("music_title");

        if (!this.nowPlaying.src) {
            if (this.audios[this.currentAudioIdx]) {
                this.nowPlaying.src = this.audios[this.currentAudioIdx].blob;   
                this.nowPlaying.play();
                musicTitle.innerText = this.audios[this.currentAudioIdx].title;

                pause.style.display = "flex";
                play.style.display = "none";
            }
        }
        else {
            this.nowPlaying.play();
            musicTitle.innerText = this.audios[this.currentAudioIdx].title;
            pause.style.display = "flex";
            play.style.display = "none";
        }
    }

    pause() {
        const play = document.querySelector("svg[data-lucide='play']");
        const pause = document.querySelector("svg[data-lucide='pause']");

        if (this.nowPlaying) {
            this.nowPlaying.pause();
            
            pause.style.display = "none";
            play.style.display = "flex";
        }
    }

    next() {
        this.pause();

        if (this.audios.length - 1 === this.currentAudioIdx) {
            alert("마지막 곡입니다.");
        }
        else {
            this.currentAudioIdx += 1;
            this.nowPlaying.src = this.audios[this.currentAudioIdx].blob;
            this.play();
        }
    }

    prev() {
        this.pause();

        if (this.currentAudioIdx === 0) {
            alert("첫 곡입니다.");
        }
        else {
            this.currentAudioIdx -= 1;
            this.nowPlaying.src = this.audios[this.currentAudioIdx].blob;   
            this.play();
        }
    }
}

window.onload = () => {
    new App().init();
}