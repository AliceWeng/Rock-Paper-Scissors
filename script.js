let toggle = document.querySelector(".toggle");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("mode");
});

let game = document.getElementById("game");

let createButton = name => {
    let button = document.createElement("button");
    button.textContent = name;
    button.classList = "pressed";
    button.id = name;
        let appendTo = div => {
            div.append(button);
        }
    return {
        appendTo: appendTo
    }
}

let click = new Audio("./audio/click.mp3");

let playerChoice;

let loadGame = async () => {
    await new Promise(resolve => {
        createButton("start").appendTo(game);

        start.addEventListener("click", () => {
            click.play();
            setTimeout(() => {
                resolve();
            }, 300);
        });
    });
    await new Promise(resolve => {
        let h1 = document.createElement("h1");
        h1.textContent = "choose your fighter";

        let rpsDiv = document.createElement("div");

        start.remove();
        game.append(h1, rpsDiv);
        createButton("rock").appendTo(rpsDiv);
        createButton("paper").appendTo(rpsDiv);
        createButton("scissors").appendTo(rpsDiv);

        let rock = document.getElementById("rock");
        let paper = document.getElementById("paper");
        let scissors = document.getElementById("scissors");
        let rps = [rock, paper, scissors];

        rps.forEach(button => {
            button.addEventListener("click", e => {
                click.play();
                playerChoice = e.target.id;
                setTimeout(() => {
                    resolve();
                }, 300);
            });
        });
    });
    await new Promise(resolve => {
        game.innerHTML = "";

        let h1 = document.createElement("h1");

        let imgDiv = document.createElement("div");
        let player = document.createElement("img");
        let computer = document.createElement("img");
        imgDiv.append(player, computer);

        let weaponsDiv = document.createElement("div");
        createButton("attack").appendTo(weaponsDiv);
        createButton("defend").appendTo(weaponsDiv);
        createButton("talk").appendTo(weaponsDiv);

        let computerChoice = ["rock", "paper", "scissors"];

        let submitChoices = (p, c) => {
            player.src = `./img/${p}.png`;
            player.alt = p;
            computer.src = `./img/${c}.png`;
            computer.alt = c;
        
            switch(p + c) {
                case "rockscissors":
                case "paperrock":
                case "scissorspaper":
                    winner = "player";
                    h1.textContent = "";
                    break;
                case "rockrock":
                case "paperpaper":
                case "scissorsscissors":
                    winner = "null";
                    h1.textContent = "";
                    break;
                case "rockpaper":
                case "paperscissors":
                case "scissorsrock":
                    winner = "computer";
                    h1.textContent = "";
                    break;
            }
        }

        submitChoices(playerChoice, computerChoice[Math.floor(Math.random() * computerChoice.length)]);

        game.append(h1, imgDiv, weaponsDiv);
        
        resolve();
    });
}

loadGame();

/*
    let playAgain = () => {
        let button = document.createElement("button");
        button.textContent = "play again";
        button.classList = "pressed";
        button.addEventListener("click", () => {
            window.location.reload();
        });
        document.body.append(button);
    }
*/