export class UploadProgressBar {
    constructor() {
        this.xhr = new XMLHttpRequest();
    }

    init() {
        const progressContainer = document.getElementById("progress_container");
        const progressBar = document.getElementById("progress_bar");
        const fileName = document.getElementById("file_name");

        // 처음 로드되었을 때
        this.xhr.upload.addEventListener("load", () => {
            progressContainer.style.display = "flex";
        })

        // 파일 업로드중일 떄
        this.xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const progress = Math.floor((e.loaded / e.total) * 100);
                this.update(progress);

                if (progress >= 100) {
                    fileName.innerText=`파일 업로드중...`
                }
                else {
                    fileName.innerText=`업로드 : ${progress}%`
                }
            }
        });

        //파일 업로드가 끝났을 때
        this.xhr.onload = (e) => {
            this.reset();
        };
    }

    update(number) {
        const progressBar = document.getElementById("progress_bar");

        progressBar.style.width = number + "%";
    }

    reset() {
        const progressContainer = document.getElementById("progress_container");
        const progressBar = document.getElementById("progress_bar");
        const fileName = document.getElementById("file_name");
        const fileInput = document.getElementById("file_input");
        const uploadButton = document.getElementById("upload_button");

        progressContainer.style.display = "none";
        progressBar.style.width = 0 + "%";

        fileInput.value = "";
        uploadButton.disabled = true;
        fileName.innerText=``;
    }
}