export class ChatMessage {
    constructor(name, message, timestamp, current_user, imageUrl) {
        this.username = name;
        this.message = message;
        this.timestamp = timestamp;
        this.current_user = current_user;
        this.imageUrl = imageUrl;
    }

    init() {
        const messageArea = document.querySelector("#message_area");
        const textDiv = document.createElement('div');

        const messageDiv = document.createElement('div');
        messageDiv.id = "message_container"

        const timestamp = document.createElement('p');
        timestamp.id = "timestamp";
        timestamp.innerText = this.timestamp.toDate();

        const username =  document.createElement('p');
        const messageText =  document.createElement('p');
        const message =  document.createElement('div');
        message.id = "message";

        if (this.username === this.current_user) {
            textDiv.id = "my_text";
        }
        else {
            textDiv.id = "others_text"
        }

        username.innerText = this.username;
        username.id = "username";

        messageText.innerText = this.message;
        messageText.id = "message_text";

        message.appendChild(messageText)
        textDiv.appendChild(username);
        messageDiv.appendChild(message);
        messageDiv.appendChild(timestamp);
        textDiv.appendChild(messageDiv);

        if(this.imageUrl) {
            const chatContainer = document.createElement('p');
            chatContainer.id = "chat_container";

            const chatImg = document.createElement('img');
            chatImg.src = this.imageUrl;
            chatImg.style.width = "100px";
            chatContainer.appendChild(chatImg);
            message.appendChild(chatContainer);
        }

        messageArea.appendChild(textDiv);
    }
}