export class Tooltip {
    constructor (arr) {
        this.mapArr = arr ? arr : [];
        this.filtered = [];
    }

    init() {
        const tooltip = document.getElementById("tooltip");

        window.addEventListener("mouseover", (e) => {
            this.filtered = this.mapArr.filter((item) => {
                return item.id === e.target.id
            })
            if (this.filtered.length > 0) {
                tooltip.style.display="flex";
                tooltip.innerText = this.filtered[0].text;
            }
            else {
                tooltip.style.display="none";
            }
        })

        window.addEventListener("mousemove", (e) => {
            tooltip.style.left = `${e.clientX + 5}px`;
            tooltip.style.top = `${e.clientY + 5}px`;
        })
    }
}