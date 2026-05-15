import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";

export class FileListArr {
    constructor() {
        this.loading = false;
        this.files = [];
        this.total = 0;
    }

    async init() {
        await this.update();
    }

    async update() {
        const fileList = document.getElementById("file_list");
        this.loading = true;
        fileList.innerHTML = "Loading...";

        const data = await axios.get('/getFiles').then((result) => {
            const data = result.data;
            return data;
        }).finally((e) => {
            this.loading = false;
            fileList.innerHTML = "";
        })

        this.files = data.file_list;
        this.total = data.total_len;

        this.files.forEach((fileInfo) => {
            const a = document.createElement('a');
            a.id = "file#" + fileInfo["file_id"];
            a.innerText = fileInfo["file_name"];
            a.href = '/getFiles/' +  fileInfo["file_id"];
            a.download = true;

            fileList.append(a)
        })
    }
}