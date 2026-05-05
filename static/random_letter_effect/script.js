class App {
    constructor() {
        this.specialCharacters = ["쌲", "뚞", "꽣", "궳", "둟", "쉟", "렣", "퍞", "폮", "끃", "낗"]
        //this.specialCharacters = ["&", "^", "$", "@", "!", "*", "(", ")", "%", "#", "~"]
        this.words = ["Some Random Word", "Hello World", "Roses Are Red", "Violets are blue"];
        this.currentIdx = 0;
        this.intervalId = null;
        this.fixed = [];
        this.timers = [];
    }

    init() {
        const container = document.createElement("p");
        container.id = "container";

        const buttonArea = document.createElement("div");
        buttonArea.id = "button_area";

        const stopButton = document.createElement("button");
        stopButton.id = "stop_button";
        stopButton.innerText = "STOP";

        const nextButton = document.createElement("button");
        nextButton.id = "next_button";
        nextButton.innerText = "NEXT";

        stopButton.addEventListener("click", () => {
            const len = this.words[this.currentIdx].length
            let timer = 0; 
            stopButton.disabled = true;

            for (let i = 0; i < len; i++) {
                this.timers.push(
                    setTimeout(() => {
                        this.stop(i);
                    }, i * 100)
                )
            }
        }, false)

        nextButton.addEventListener("click", () => {
            stopButton.disabled = false;
            this.changeIdx();
            this.randomEffect();
        }, false)

        document.body.appendChild(container);
        buttonArea.appendChild(stopButton);
        buttonArea.appendChild(nextButton);
        document.body.appendChild(buttonArea);

        this.randomEffect();
    }

    changeIdx() {
        if (this.currentIdx === this.words.length - 1) {
            this.currentIdx = 0;
        }
        else {
            this.currentIdx = this.currentIdx + 1;
        }
    }

    generateRandomLetter() {
        const specialLen = this.specialCharacters.length;

        return this.specialCharacters[Math.floor(Math.random() * (specialLen - 1))]
    }

    generateRandomWord() {
        var buf = "";
        const len = this.words[this.currentIdx].length;

        for (let i = 0; i < len; i++) {
            if (this.fixed.includes(i)) {
                buf += this.words[this.currentIdx][i];
                continue
            }

            if (this.words[this.currentIdx][i] === " ") {
                buf += " ";
                continue;
            }
            buf += this.generateRandomLetter();
        }

        return buf;
    }

    randomEffect() {
        this.fixed = [];
        this.timers.forEach((id) => {clearTimeout(id)});
        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
            const container = document.getElementById("container");
            container.innerText = this.generateRandomWord();
        }, 40)
    }

    stop(num) {
        if (!this.fixed.includes(num)) {
            this.fixed.push(num)
        }
    }
}

window.onload = () => {
    const app = new App();
    app.init();
}