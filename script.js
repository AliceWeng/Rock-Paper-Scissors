let toggle = document.querySelector(".toggle");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("mode");
});

let game = document.getElementById("game");

let createButton = (name, div) => {
    let button = document.createElement("button");
    button.textContent = name;
    button.classList = "pressed";
    button.id = name;
    div.append(button);
}

let click = new Audio("./audio/click.mp3");

let loadGame = async () => {
    await new Promise(resolve => {
        let start = document.createElement("button");
        start.textContent = "start";
        start.classList = "pressed";
        start.id = "start";
        game.append(start);

        start.addEventListener("click", () => {
            click.play();
            resolve();
        });
    });
    await new Promise(resolve => {
        let h1 = document.createElement("h1");
        h1.textContent = "choose your fighter";

        let rpsDiv = document.createElement("div");
        rpsDiv.classList = "rpsDiv";

        setTimeout(() => {
            start.remove();
            game.append(h1, rpsDiv);
            createButton("rock", rpsDiv);
            createButton("paper", rpsDiv);
            createButton("scissors", rpsDiv);
            resolve();
        }, 300);
    });
    await new Promise(resolve => {
        let player = document.createElement("img");
        let computer = document.createElement("img");
        let imgDiv = document.createElement("div");

        let rock = document.getElementById("rock");
        let paper = document.getElementById("paper");
        let scissors = document.getElementById("scissors");
        let rps = [rock, paper, scissors];

        let computerChoose = ["rock", "paper", "scissors"];

        let playerChoose = (playerChoice, computerChoice) => {
            player.src = `./img/${playerChoice}.png`;
            player.alt = playerChoice;
            computer.src = `./img/${computerChoice}.png`;
            computer.alt = computerChoice;
            imgDiv.append(player, computer);
        
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

        let weaponsDiv = document.createElement("div");
        weaponsDiv.classList = "weaponsDiv";

        createButton("attack", weaponsDiv);
        createButton("defend", weaponsDiv);
        createButton("talk", weaponsDiv);

        rps.forEach(button => {
            button.addEventListener("click", e => {
                click.play();
                game.innerHTML = "";
                game.append(imgDiv);
                game.append(weaponsDiv);
                playerChoose(e.target.id, computerChoose[Math.floor(Math.random() * computerChoose.length)]);
                resolve();
            });
        });
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