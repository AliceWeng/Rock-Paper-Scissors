let game = document.getElementById("game");
let start = document.getElementById("start");

let createButton = rps => {
    let button = document.createElement("button");
    button.textContent = rps;
    button.className = "rpsButton"
    button.id = rps;
    game.append(button)
}
let createHeading = string => {
    let h1 = document.createElement("h1");
    h1.textContent = string;
    h1.className = "heading";
    game.append(h1);
}

let click = new Audio("./img/click.mp3");

start.addEventListener("click", () => {
    click.play();
    setTimeout(() => {
        start.remove();
        createHeading("choose your fighter");
        createButton("rock");
        createButton("paper");
        createButton("scissors");
    }, 300);
})