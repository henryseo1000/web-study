export class ProgressBar {
    constructor(maxProgress) {
        this.maxProgress = maxProgress;
        this.currentProgress = 0;
    }

    init() {
        const bar = document.createElement('div');
        bar.id = "bar";

        bar.style.height = "3px";
        bar.style.width = "0px";
        bar.style.position = "absolute";
        bar.style.top = "0px";
        bar.style.left = "0px";
        bar.style.background = "linear-gradient(0.25turn, rgba(245, 40, 145, 1), rgba(216, 43, 224, 1))";
        bar.style.transitionDuration = "0.3s";

        return bar;
    }

    update(currentProgress) {
        const bar = document.getElementById('bar');
        this.currentProgress = currentProgress;

        bar.style.width = this.currentProgress / this.maxProgress * 100 + "%";
    }
}