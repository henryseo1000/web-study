import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js'
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js'
import { getFirestore, doc, getDoc, getDocs, addDoc, collection, serverTimestamp, orderBy, onSnapshot, Timestamp } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js'
import { 
    getDatabase,
    set,
    get,
    ref,
    update,
    query
} from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-storage.js';
import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@14.0.0/+esm';
import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
import { ChatMessage } from "./chatMessage.js";
import { TopBar } from "./topBar.js";
import { ImageSender } from "./imageSender.js";

const firebaseConfig = {
  apiKey: "AIzaSyBFmT3Dn80MzeMvU04LKlAnn3NExucKZR0",
  authDomain: "mjusubwaystation.firebaseapp.com",
  projectId: "mjusubwaystation",
  storageBucket: "mjusubwaystation.firebasestorage.app",
  messagingSenderId: "638521949353",
  appId: "1:638521949353:web:bf3e7b019577ad0d8a7db8"
};

async function getData(id) {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const docRef = doc(db, "chat", id); // collection, documentID
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return {};
    }
}

async function getAllDocs() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const buf = [];

    return await getDocs(query(collection(db, "chat"), orderBy("created_time")))
}

class App {
    constructor() {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        this.app = app;
        this.db = db;
        this.inputText = "";
        this.user = "";
        this.imageSender = null;

        this.init();

        onSnapshot(query(collection(this.db, "chat"), orderBy("created_time")), (snapshot) => {
            this.initMessage();

            snapshot.forEach(async (item) => {
                await getData(item.id)
                .then((data) => {
                    (new ChatMessage(data.username, data.message, data.created_time, this.user, data.imageUrl)).init()
                })
                .then(() => {
                    const messageArea = document.querySelector('#message_area');
                    messageArea.scrollIntoView({behavior: "smooth", block: "end"})
                })
            })
        })
    }

    init() {
        while(this.user === "") {
            this.user = prompt("Username을 입력해주세요").trim();
        }

        const container = document.querySelector('.container');
        container.innerHTML = "";
        this.inputText = "";

        const messageArea = document.createElement('div');
        messageArea.id = "message_area";
        messageArea.addEventListener("load", () => {
            messageArea.scrollIntoView({ behavior: "smooth", block: "end"});
        })

        container.appendChild(messageArea);

        new TopBar("Test Chat", this.user).init();

        const inputArea = document.createElement("div");
        inputArea.id = "input_area";

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Type your message...";
        input.oninput = (e) => this.handleInput(e);
        input.value = this.inputText;
        input.id = "text_input"

        const button = document.createElement("button");
        button.onclick = async () => await this.postData();
        const img = document.createElement("img");
        button.id = "send_button";

        const addButton = document.createElement("button");
        const addImg = document.createElement("img");
        addButton.id = "add_button";

        img.src = "static/chat_app/assets/send.png";
        img.alt = "send.png";
        img.draggable = false;

        addImg.src = "static/chat_app/assets/add.png";
        addImg.alt = "add.png";
        addImg.draggable = false;

        inputArea.appendChild(addButton);
        inputArea.appendChild(input);
        button.appendChild(img);
        addButton.appendChild(addImg);
        inputArea.appendChild(button);

        container.appendChild(inputArea);

        this.imageSender = new ImageSender(addButton);
        this.imageSender.init();
    }

    handleInput(e) {
        this.inputText = e.target.value;
    }

    async postData(e) {
        const textInput = document.querySelector("#text_input");
        const imagePreview = document.querySelector("#image_preview");

        if (this.inputText.trim() === "" && !imagePreview) {
            return;
        }

        try {
            await addDoc(collection(this.db, "chat"), imagePreview ? {
                username: this.user,
                message: this.inputText,
                created_time: Timestamp.now(),
                imageUrl: imagePreview.src
            } : 
            {
                username: this.user,
                message: this.inputText,
                created_time: Timestamp.now()
            })
            .then(() => {
                const imageShower = document.querySelector("#image_shower");

                textInput.value = "";
                this.inputText = "";
                this.imageSender.delete();
                imageShower.style.display = "none";
            })
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    initMessage() {
        const messageArea = document.querySelector('#message_area');
        messageArea.innerHTML = ''
    }
}

window.onload = async () => {
    const app = new App();
}