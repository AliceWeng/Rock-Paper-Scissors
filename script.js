let game = document.getElementById("game");
let start = document.getElementById("start");

start.addEventListener("click", () => {
    setTimeout(() => {
        start.remove();
    }, 300);
})