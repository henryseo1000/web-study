import { FileListArr } from "./filelist.js";
import { UploadProgressBar } from "./uploadprogressbar.js";

class App {
    constructor() {
        this.uploadProgressBar = new UploadProgressBar();
        this.formData = new FormData();
        this.fileList = new FileListArr();
    }

    async init() {
        const fileInput = document.getElementById("file_input");
        const browseButton = document.getElementById("browse_button");
        const uploadButton = document.getElementById("upload_button");
        const submitButton = document.getElementById("submit_button");

        browseButton.addEventListener("click", () => {
            fileInput.click();
        })

        uploadButton.addEventListener("click", () => {
            this.formData.append('file_data', fileInput.files[0]);
            this.uploadProgressBar.xhr.open('POST', '/uploadFiles', true);
            this.uploadProgressBar.xhr.send(this.formData);
        })

        fileInput.addEventListener("input", (e) => {
            if(e.target.files.length > 0) {
                uploadButton.disabled = false;
            }
            else {
                uploadButton.disabled = true;
            }
        })

        this.uploadProgressBar.init();
        await this.fileList.init();
    }
}

window.onload = async () => {
    await new App().init();
}