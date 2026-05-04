import { getStorage, ref, uploadString } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-storage.js';
import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@14.0.0/+esm';

export class ImageSender {
    constructor(button) {
        this.button = button;
        this.input = null;
    }

    init() {
        const input = document.createElement('input');
        input.style.display = "none";
        input.type = "file";
        input.accept="image/*";
        input.multiple = true;
        input.id = "image_sender";
        input.addEventListener("change", (e) => {
            console.log(this.update(e));
        })

        const imageShower = document.createElement('div');
        imageShower.id = "image_shower"
        const inputArea = document.querySelector('#input_area');
        inputArea.appendChild(imageShower);

        this.input = input;

        this.button.addEventListener("click", () => {
            input.click();
        })
    }

    update(e) {
        const imageShower = document.querySelector("#image_shower");
        imageShower.innerHTML = "";

        if (e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0]
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onloadend = (e) => {

                imageShower.style.display = "flex"
                const img = document.createElement('img');
                img.setAttribute('src', e.target.result);
                img.setAttribute('data-file', file.name);
                img.draggable = false;
                img.id="image_preview";
                imageShower.appendChild(img);
            }

            return fileReader.result;
        }
        else {
            imageShower.style.display = "none";
            return null;
        }
    }

    delete() {
        const imageShower = document.querySelector("#image_shower");
        imageShower.innerHTML = "";
        this.input.files = null;
    }
}