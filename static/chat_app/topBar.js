export class TopBar {
    constructor(chatName, connectedAs) {
        this.chatName = chatName;
        this.connectedAs = connectedAs
    }
    
    init() {
        const container = document.querySelector('.container');
        const nav = document.createElement('nav');
        // const backButton = document.createElement('button');
        // const menuButton = document.createElement('button');
        const chatTitleArea = document.createElement('div');
        chatTitleArea.id = "chat_title_area";

        const chatDescriptionArea = document.createElement('div');
        chatDescriptionArea.id = "chat_description_area";

        const chatName = document.createElement('p');
        chatName.id = "chat_name";

        const connectedAs = document.createElement('p');
        connectedAs.id = "connected_as";

        const pingArea = document.createElement('div');
        pingArea.id = "ping_area";

        const dotPing = document.createElement('div');
        dotPing.id = "dot_ping";

        const dot = document.createElement('div');
        dot.id = "dot";

        chatTitleArea.appendChild(chatName);
        pingArea.appendChild(dotPing);
        pingArea.appendChild(dot);
        chatDescriptionArea.appendChild(pingArea);
        chatDescriptionArea.appendChild(connectedAs);

        nav.id = "nav";
        // backButton.id = "back_button";
        // menuButton.id = "menu_button"

        chatName.innerText = this.chatName;
        connectedAs.innerText = "Connected as \"" + this.connectedAs + "\"";
        // backButton.innerText = "Back";
        // menuButton.innerText = "Menu";

        // nav.appendChild(menuButton);
        nav.appendChild(chatTitleArea);
        nav.appendChild(chatDescriptionArea);
        // nav.appendChild(backButton);

        container.appendChild(nav);
    }
}