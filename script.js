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

let create = new Promise(resolve => {
    start.addEventListener("click", () => {
        click.play();
        setTimeout(() => {
            start.remove();
            createHeading("choose your fighter");
            createButton("rock");
            createButton("paper");
            createButton("scissors");
            resolve();
        }, 300);
    })  
})

let rock; let paper; let scissors; let rps;

let get = () => {
    return new Promise(resolve => {
        rock = document.getElementById("rock");
        paper = document.getElementById("paper");
        scissors = document.getElementById("scissors");
        rps = [rock, paper, scissors];
        resolve();
    })
}

let computerChoose = ["rock", "paper", "scissors"];

let set = async () => {
    await create;
    await get();
    rps.forEach(button => {
        button.addEventListener("click", e => {
            iChoose(e.target.id, computerChoose[Math.floor(Math.random() * computerChoose.length)]);
        });
    })
}

let result = (myChoice, computerChoice) => {
    switch(myChoice, computerChoice){
        case "rockscissors":
        case "paperrock":
        case "scissorspaper":
            console.log("win")
            break;
        case "rockrock":
        case "paperpaper":
        case "scissorsscissors":
            console.log("tie");
            break;
        case "rockpaper":
        case "paperscissors":
        case "scissorsrock":
            console.log("lose");
            break;
    }
}

let protagonist = document.createElement("img");
let antagonist = document.createElement("img");

let iChoose = (p, a) => {
    protagonist.src = `./img/${p}.png`;
    protagonist.alt = p;
    antagonist.src = `./img/${a}.png`;
    antagonist.alt = a;
    game.append(protagonist, antagonist);
    result(p, a);
}

set();