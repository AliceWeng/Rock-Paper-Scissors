let toggle = document.createElement("div");
toggle.classList = "toggle";
toggle.title = "dark mode toggle";
toggle.addEventListener("click", () => {
    document.body.classList.toggle("mode");
});

let container = document.createElement("div");
container.classList = "container";

let dark = document.createElement("div");
dark.classList = "dark";

document.body.append(toggle, container);
container.append(dark);

let click = new Audio("./audio/click.mp3");

let loadGame = async () => {
    await new Promise(resolve => {
        let start = document.createElement("button");
        start.textContent = "start";
        start.classList = "pressed";
        start.id = "start";
        document.body.append(start);

        start.addEventListener("click", () => {
            click.play();
            resolve();
        });
    });
    await new Promise(resolve => {
        let h1 = document.createElement("h1");
        h1.textContent = "choose your fighter";

        let buttonDiv = document.createElement("div");
        buttonDiv.classList = "buttonDiv";

        let createButton = rps => {
            let button = document.createElement("button");
            button.textContent = rps;
            button.classList = "pressed";
            button.id = rps;
            buttonDiv.append(button);
        }

        setTimeout(() => {
            start.remove();
            document.body.append(h1, buttonDiv);
            createButton("rock");
            createButton("paper");
            createButton("scissors");
            resolve();
        }, 300);
    });
    await new Promise(resolve => {
        let player = document.createElement("img");
        let computer = document.createElement("img");
        let h1 = document.querySelector("h1");
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
            document.body.append(player, computer);
        
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
                click.play();
                playerChoose(e.target.id, computerChoose[Math.floor(Math.random() * computerChoose.length)]);
                rock.remove();
                paper.remove();
                scissors.remove();
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