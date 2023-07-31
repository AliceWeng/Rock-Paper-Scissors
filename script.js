let toggle = document.getElementById("toggle");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")) {
        toggle.ariaLabel = "turn off dark mode";
    } else toggle.ariaLabel = "turn on dark mode";
});

let game = document.querySelector(".game");

let createButton = name => {
    let button = document.createElement("button");
    button.textContent = name;
    button.id = name;

    let appendTo = div => div.append(button);
    return {
        appendTo: appendTo
    }
}

let horn = new Audio("./audio/horn.mp3");
let click = new Audio("./audio/click.mp3");
let emotionalDamage = new Audio("./audio/emotionaldamage.mp3");

let playerChoice;

let loadGame = async () => {
    await new Promise(resolve => {
        createButton("start").appendTo(game);

        start.addEventListener("click", () => {
            click.play();
            setTimeout(() => resolve(), 150);
        });
    });

    await new Promise(resolve => {
        let h1 = document.createElement("h1");
        h1.textContent = "Choose your fighter.";

        let rpsDiv = document.createElement("div");
        createButton("rock").appendTo(rpsDiv);
        createButton("paper").appendTo(rpsDiv);
        createButton("scissors").appendTo(rpsDiv);

        start.remove();
        game.append(h1, rpsDiv);

        let rps = [rock, paper, scissors];
        
        rps.forEach(button => {
            button.addEventListener("click", e => {
                click.play();
                playerChoice = e.target.id;
                setTimeout(() => resolve(), 150);
            });
        });
    });

    game.innerHTML = "";

    let h1 = document.createElement("h1");

    let span = document.createElement("span");
    span.ariaHidden = "true";

    let hpDiv = document.createElement("div");
    hpDiv.classList = "flex";

    let playerHealth = 5;
    let playerBar = document.createElement("h2");
    playerBar.textContent = `Player : ${playerHealth}HP`;

    let computerHealth = 5;
    let computerBar = document.createElement("h2");
    computerBar.textContent = `Computer : ${computerHealth}HP`;

    hpDiv.append(playerBar, computerBar);
    
    let imgDiv = document.createElement("div");
    imgDiv.classList = "flex";

    let player = document.createElement("img");
    let computer = document.createElement("img");

    let vs = document.createElement("h3");
    vs.textContent = "vs";
    vs.ariaLabel = "versus";
    
    imgDiv.append(player, vs, computer);

    let playerDamage; let computerDamage;

    let weaponsDiv = document.createElement("div");
    createButton("attack").appendTo(weaponsDiv);
    createButton("defend").appendTo(weaponsDiv);
    createButton("talk").appendTo(weaponsDiv);

    let reload = document.createElement("button");
    reload.textContent = "play again";
    reload.id = "reload";
    reload.addEventListener("click", () => {
        click.play();
        setTimeout(() => {
            game.innerHTML = "";
            loadGame();
        }, 150);
    });

    let read = [];
    let script;
    let a = 0;
    let b = 0;

    let narrate = () => {
        if(b < script[a].length) {
            read.push(script[a][b]);
            b++;
            span.textContent = read.join("");
            setTimeout(narrate, 50);
        }
    }

    h1.addEventListener("click", () => {
        if(a < script.length - 1) {
            a++;
            b = 0;
            read = [];
            narrate();
        } else horn.play();
    });

    let you = result => {
        if(result === "win") {
            h1.textContent = "You sneak up on the enemy. It's your move."
        }
        if(result === "tie") {
            script = [  "It's like looking in a mirror.",
                        "You end up becoming the best of friends.",
                        "That's a win in my book."];
            h1.ariaLabel = script.join(" ");
            h1.style.cursor = "pointer";
            h1.append(span);
            game.append(h1, imgDiv, reload);
            narrate();
            return;
        }
        if(result === "lose") {
            computer.className = "attack";
            computerDamage = Math.floor(Math.random() * 3) + 1;
            playerHealth -= computerDamage;
            playerBar.textContent = `Player : ${playerHealth}HP`;
            h1.textContent = `The enemy used sneak attack. You lose ${computerDamage}HP.`;
        }

        game.append(h1, hpDiv, imgDiv, weaponsDiv);

        let endFight = () => {
            weaponsDiv.remove();
            game.append(reload);
            h1.style.cursor = "pointer";
        }
        let disableButtons = () => {
            attack.disabled = true;
            defend.disabled = true;
            talk.disabled = true;
        }
        let enableButtons = () => {
            attack.disabled = false;
            defend.disabled = false;
            talk.disabled = false;
        }

        let computerAttack = () => {
            setTimeout(() => {
                player.className = "";
                computer.className = "attack";
                computerDamage = Math.floor(Math.random() * 3) + 1;
                playerHealth -= computerDamage;
                if(playerHealth < 0) playerHealth = 0;
                playerBar.textContent = `Player : ${playerHealth}HP`;
                h1.textContent = `The enemy's attack dealt ${computerDamage} damage.`;
                if(playerHealth === 0) {
                    endFight();
                    setTimeout(() => {
                        h1.textContent = "defeat";
                        h1.style.textTransform = "uppercase";
                        h1.addEventListener("click", () => emotionalDamage.play());
                    }, 1500);
                } else enableButtons();
            }, 1500);
        }

        attack.addEventListener("click", e => {
            disableButtons();
            click.play();
            let playerAttack = new Promise((resolve, reject) => {
                computer.className = "";
                player.className = "attack";
                playerDamage = Math.floor(Math.random() * 3) + 1;
                computerHealth -= playerDamage;
                if(computerHealth < 0) computerHealth = 0;
                computerBar.textContent = `Computer : ${computerHealth}HP`;
                h1.textContent = `Your attack dealt ${playerDamage} damage.`;
                if(computerHealth > 0) {
                    resolve();
                } else reject();
            });
            playerAttack.then(() => computerAttack()).catch(() => {
                endFight();
                setTimeout(() => {
                    h1.textContent = "";
                    h1.style.textTransform = "uppercase";
                    let anchor = document.createElement("a");
                    anchor.href = "https://www.youtube.com/watch?v=u9rj5s-nDvw&ab_channel=TheRealSullyG";
                    anchor.rel = "noopener noreferrer";
                    anchor.textContent = "victory";
                    anchor.target = "_blank";
                    h1.append(anchor);
                }, 1500);
            });
        });
        
        defend.addEventListener("click", () => {
            click.play();
            computer.className = "attack";
            player.className = "defend";
            computerDamage = Math.floor(Math.random() * 3) + 1;
            h1.textContent = `You blocked ${computerDamage} damage from the enemy's attack.`;
        });

        let mercy = 0;
        
        talk.addEventListener("click", () => {
            disableButtons();
            click.play();
            computer.className = "";
            player.className = "talk";
            mercy++;
            if(mercy === 1) {
                h1.textContent = `You compliment ${computer.alt}.`;
                computerAttack();
            } else if(mercy === 2) {
                h1.textContent = `You ask about ${computer.alt}'s day.`;
                computerAttack();
            } else if(mercy === 3) {
                endFight();
                script = [  "You finally got through to them.",
                            "You put aside your differences and have a nice conversation.",
                            "It's a beautiful day today."];
                h1.ariaLabel = script.join(" ");
                h1.textContent = "";
                h1.append(span);
                narrate();
            }
        });
    }

    let submit = (p, c) => {
        player.src = `./img/${p}.png`;
        player.alt = p;
        computer.src = `./img/${c}.png`;
        computer.alt = c;
    
        switch(p + c) {
            case "rockscissors":
            case "paperrock":
            case "scissorspaper":
                you("win");
                break;
            case "rockrock":
            case "paperpaper":
            case "scissorsscissors":
                you("tie");
                break;
            case "rockpaper":
            case "paperscissors":
            case "scissorsrock":
                you("lose");
                break;
        }
    }

    let computerChoice = ["rock", "paper", "scissors"];

    submit(playerChoice, computerChoice[Math.floor(Math.random() * computerChoice.length)]);
}

loadGame();