let game = document.getElementById("game");
let start = document.getElementById("start");

let createButton = rps => {
    let button = document.createElement("button");
    button.textContent = rps;
    button.className = "rpsButton";
    button.id = rps;
    game.append(button);
}
let createHeading = () => {
    let h1 = document.createElement("h1");
    h1.textContent = "choose your fighter";
    game.append(h1);
}

let click = new Audio("./img/click.mp3");

let create = new Promise(resolve => {
    start.addEventListener("click", () => {
        click.play();
        setTimeout(() => {
            start.remove();
            createHeading();
            createButton("rock");
            createButton("paper");
            createButton("scissors");
            resolve();
        }, 300);
    });
});

let h1; let rock; let paper; let scissors; let rps;

let get = () => {
    return new Promise(resolve => {
        h1 = document.querySelector("h1");
        rock = document.getElementById("rock");
        paper = document.getElementById("paper");
        scissors = document.getElementById("scissors");
        rps = [rock, paper, scissors];
        resolve();
    });
}

let computerChoose = ["rock", "paper", "scissors"];
let player = document.createElement("img");
let computer = document.createElement("img");

let set = async () => {
    await create;
    await get();

    let playerChoose = (playerChoice, computerChoice) => {
        player.src = `./img/${playerChoice}.png`;
        player.alt = playerChoice;
        computer.src = `./img/${computerChoice}.png`;
        computer.alt = computerChoice;
        game.append(player, computer);
    
        switch(playerChoice + computerChoice) {
            case "rockscissors":
            case "paperrock":
            case "scissorspaper":
                h1.textContent = "you're a winner";
                break;
            case "rockrock":
            case "paperpaper":
            case "scissorsscissors":
                h1.textContent = "it's a tie";
                break;
            case "rockpaper":
            case "paperscissors":
            case "scissorsrock":
                h1.textContent = "you've been defeated";
                break;
        }
    }

    rps.forEach(button => {
        button.addEventListener("click", e => {
            setTimeout(() => {
                playerChoose(e.target.id, computerChoose[Math.floor(Math.random() * computerChoose.length)]);
                rock.remove();
                paper.remove();
                scissors.remove();
            }, 300);
        });
    });
}

set();