import Effect from "./effect.js";
import consoleText from "./console.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//echoes gradient
let gradientEchoes = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradientEchoes.addColorStop(0, "#4afffa")
gradientEchoes.addColorStop(2 / 3, "#30e1a6")

//gradient color
let gradientGay = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradientGay.addColorStop(0, "red");
gradientGay.addColorStop(0.2, "yellow");
gradientGay.addColorStop(0.4, "green");
gradientGay.addColorStop(0.6, "cyan");
gradientGay.addColorStop(0.8, "blue");
gradientGay.addColorStop(0, "magenta");

// default color
let defaultColor = gradientEchoes;

// creating effect object which initializes symbols array with Symbol objects
const effect = new Effect(canvas.width, canvas.height);

let lastTime = 0;
const fps = 50;
const nextframe = 1000 / fps; //for fps = 50, nextFrame = 20
let timer = 0;

function animate(timeStamp) {
  // checking paint time difference
  const deltaTime = timeStamp - lastTime;
  //updating lastTime = current elapsed time to  paint the screen
  lastTime = timeStamp;
  // if time exceeds nextframe value then paint
  // and reset timer to zero else add delta time
  if (timer > nextframe) {
    // drawing transparent rectangle over text to hide previous text
    ctx.fillStyle = "rgba(0,0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // text color
    ctx.fillStyle = defaultColor;
    //drawing text column
    effect.symbols.forEach((symbol) => {
      symbol.draw(ctx);
      symbol.update();
    });
    timer = 0;
  } else {
    timer += deltaTime;
  }

  requestAnimationFrame(animate);
}
animate(0);

// resize event to handle columns adjustment on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  effect.resize(canvas.width, canvas.height);
  gradientGay = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradientGay.addColorStop(0, "red");
  gradientGay.addColorStop(0.2, "yellow");
  gradientGay.addColorStop(0.4, "green");
  gradientGay.addColorStop(0.6, "cyan");
  gradientGay.addColorStop(0.8, "blue");
  gradientGay.addColorStop(0, "magenta");
});

//double mouse click event
window.addEventListener("dblclick", () => {
  defaultColor === gradientEchoes
    ? (defaultColor = gradientGay)
    : (defaultColor = gradientEchoes);
});

//double touch event on touch screen devices
var lastTouchEnd = 0;
window.addEventListener("touchend", () => {
  var now = new Date().getTime();
  if (now - lastTouchEnd <= 300) {
    // Code to be executed when a double-tap is detected
    defaultColor === gradientEchoes
      ? (defaultColor = gradientGay)
      : (defaultColor = gradientEchoes);
  }
  lastTouchEnd = now;
});

function swRegistration() {
  const heart = [
    "font-size: 20px",
    "padding: 12px",
    "margin: 4px 0 4px 4px",
    "color: rgba(238,58,136,1)",
  ].join(";");
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("serviceWorker.js", { scope: "." })
      .then((registration) => {
        console.log("%c❤️", heart);
      })
      .catch((error) => console.log(error));
  }
}
swRegistration();
consoleText();
