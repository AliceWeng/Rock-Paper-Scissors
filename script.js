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

let playAgain = document.createElement("button");
playAgain.textContent = "play again";
playAgain.classList = "pressed";
playAgain.id = "playAgain";
playAgain.addEventListener("click", () => {
    click.play();
    setTimeout(() => {
        window.location.reload(); 
    }, 300);
});

let click = new Audio("./audio/click.mp3");

let playerChoice; let result;

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
        h1.textContent = "Choose your fighter.";

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
        imgDiv.classList = "imgDiv";
        let player = document.createElement("img");
        let vs = document.createElement("h2");
        vs.textContent = "vs";
        let computer = document.createElement("img");
        imgDiv.append(player, vs, computer);

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
                    result = "win";
                    break;
                case "rockrock":
                case "paperpaper":
                case "scissorsscissors":
                    result = "draw";
                    break;
                case "rockpaper":
                case "paperscissors":
                case "scissorsrock":
                    result = "lose";
                    break;
            }
        }

        submitChoices(playerChoice, computerChoice[Math.floor(Math.random() * computerChoice.length)]);

        let script;
        let read = [];
        let a = 0;
        let b = 0;

        let narrate = () => {
            h1.textContent = read.join("");
            if(b < script[a].length) {
                    read.push(script[a][b]);
                    b++;
                }
            setTimeout(narrate, 50);
        }

        h1.addEventListener("click", () => {
            if(a < script.length - 1) {
                a++;
                read = [];
                b = 0;
            }
        })

        if(result === "win") {
            h1.textContent = "You've got the upperhand.";
            game.append(h1, imgDiv, weaponsDiv);
            resolve();
        } else if(result === "draw") {
            script = ["It's like looking in a mirror.", "You end up becoming the best of friends.", "Everyone's a winner!"];
            game.append(h1, imgDiv, playAgain);
            narrate();
        } else if(result === "lose") {
            h1.textContent = "You've been attacked.";
            game.append(h1, imgDiv, weaponsDiv);
            resolve();
        }
    });
    await new Promise(resolve => {
        let attack = document.getElementById("attack");
        let defend = document.getElementById("defend");
        let talk = document.getElementById("talk");

        if(result)
        resolve();
    });
}

loadGame();