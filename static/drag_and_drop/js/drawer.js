export class Drawer {
    constructor() {
        this.playlist = [];
        this.isOpen = false;
    }

    init() {
        const drawerContainer = document.getElementById("drawer_container");
        const x = document.querySelector("svg[data-lucide='x']");

        x.addEventListener("click", () => {
            if(this.isOpen) {
                this.close();
            }
            else {
                this.open();
            }
        })
    }

    update(fileList) {
        const playlist = document.getElementById("playlist");

        playlist.innerHTML = "";
        this.playlist = fileList;

        fileList.forEach((audio) => {
            const audioList = document.createElement("div");
            audioList.className = "audio_list";
            audioList.innerText = audio.title;
            playlist.appendChild(audioList)
        })
        
    }

    open() {
        const drawerContainer = document.getElementById("drawer_container");
        drawerContainer.style.width = "400px";
        drawerContainer.style.padding = "30px 30px";

        this.isOpen = true;
    }

    close() {
        const drawerContainer = document.getElementById("drawer_container");
        drawerContainer.style.width = "0px";
        drawerContainer.style.padding = "30px 0px";

        this.isOpen = false;
    }
}