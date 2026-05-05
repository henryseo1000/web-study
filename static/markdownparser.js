import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

export class MarkDownParser {
    constructor() {
        this.markdown = "";
    }

    init() {
        document.getElementById('description').innerHTML = marked.parse('# Marked in the browser\n\nRendered by **marked**.');
    }

    parse(markdown) {
        this.markdown = markdown;
        document.getElementById('description').innerHTML = marked.parse(this.markdown);
        
        return marked.parse(this.markdown);
    }
}