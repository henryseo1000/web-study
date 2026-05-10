export class DragDrop {
    constructor() {
        this.files = [];
    }

    init() {
        const dragDrop = document.getElementById("drag_drop_container");
        const empty = document.getElementById("empty");
        const fileList = document.getElementById("file_list");

        dragDrop.addEventListener("drop", (e) => {
            fileList.innerHTML = "";
            e.preventDefault();

            if (e.dataTransfer?.files) {
                if (e.dataTransfer?.files[0].type.includes("audio")) {
                    this.files = [...this.files, ...e.dataTransfer?.files];
                }
                else {
                    alert("오디오 파일만 업로드 가능합니다!");
                }
            }

            this.update();

            dragDrop.style.opacity = "1.0";
        })

        dragDrop.addEventListener("dragover", (e) => {
            e.preventDefault();
            dragDrop.style.opacity = "0.8";
        })

        dragDrop.addEventListener("dragleave", (e) => {
            dragDrop.style.opacity = "1.0";
        })
    }

    update() {
        const fileList = document.getElementById("file_list");
        const empty = document.getElementById("empty");

        if (this.files.length === 0) {
            fileList.innerHTML = "";

            empty.style.display = "flex";
            fileList.style.display = "none";
        }
        else {
            empty.style.display = "none";
            fileList.style.display = "flex";

            this.files.forEach((file) => {
                const p = document.createElement('p');
                p.className = "file_name";
                fileList.appendChild(p);
                p.innerText = file.name;
            })
        }
    }

    getfiles() {
        return this.files;
    }

    setFiles(arr) {
        this.files = arr;
        this.update();
    }
}