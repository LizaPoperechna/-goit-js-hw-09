const startBtn = document.querySelector("[data-start]");
const closeBtn = document.querySelector("[data-stop]");
const body = document.querySelector("body");


let timerId = null;

closeBtn.setAttribute("disabled", "");

startBtn.addEventListener("click", () => { 
    timerId = setInterval(() => { 
        body.style.backgroundColor = getRandomHexColor()
    }, 1000)

    startBtn.setAttribute("disabled", "");
    closeBtn.removeAttribute("disabled");
});


closeBtn.addEventListener("click", () => {
    clearInterval(timerId);
    closeBtn.setAttribute("disabled", "");
    startBtn.removeAttribute("disabled");
    
});




function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}