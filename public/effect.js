import Drop from "./drop.js";

export default class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 17;
        this.columns = canvasWidth / this.fontSize;
        console.log(this.columns);
        this.drops = [];
        this.#initialize();
    }

    #initialize() {
        // initializing drops array with drop objects
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = new Drop(i, 0, this.fontSize, this.canvasHeight);
        }
    }

    //function will be called when window resize event occurs
    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth / this.fontSize;
        this.drops = [];
        this.#initialize();
    }
}