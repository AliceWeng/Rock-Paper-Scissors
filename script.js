let game = document.getElementById("game");

let createButton = name => {
    let button = document.createElement("button");
    button.textContent = name;
    button.id = name;
        let appendTo = div => {
            div.append(button);
        }
    return {
        appendTo: appendTo
    }
}

let click = new Audio("./audio/click.mp3");
let horn = new Audio("./audio/horn.mp3");
let emotionalDamage = new Audio("./audio/emotionaldamage.mp3");

let playerChoice;

let loadGame = async () => {
    await new Promise(resolve => {
        createButton("start").appendTo(game);
        
        start.addEventListener("click", () => {
            click.play();
            setTimeout(() => {
                resolve();
            }, 150);
        });
    });
    await new Promise(resolve => {
        let h1 = document.createElement("h1");
        h1.textContent = "Choose Your Fighter";

        let rpsDiv = document.createElement("div");

        start.remove();
        game.append(h1, rpsDiv);
        createButton("rock").appendTo(rpsDiv);
        createButton("paper").appendTo(rpsDiv);
        createButton("scissors").appendTo(rpsDiv);

        let rps = [rock, paper, scissors];

        rps.forEach(button => {
            button.addEventListener("click", e => {
                click.play();
                playerChoice = e.target.id;
                setTimeout(() => {
                    resolve();
                }, 150);
            });
        });
    });
        game.innerHTML = "";

        let h1 = document.createElement("h1");

        let hpDiv = document.createElement("div");
        hpDiv.classList = "flexDiv";

        let playerHealth = 5;
        let playerBar = document.createElement("h2");
        playerBar.textContent = `Player : ${playerHealth}HP`;

        let computerHealth = 5;
        let computerBar = document.createElement("h2");
        computerBar.textContent = `Computer : ${computerHealth}HP`;

        hpDiv.append(playerBar, computerBar);
        
        let imgDiv = document.createElement("div");
        imgDiv.classList = "flexDiv";

        let player = document.createElement("img");
        let computer = document.createElement("img");
        let vs = document.createElement("h3");
        vs.textContent = "vs";
        
        imgDiv.append(player, vs, computer);

        let playerDamage; let computerDamage;

        let weaponsDiv = document.createElement("div");
        createButton("attack").appendTo(weaponsDiv);
        createButton("defend").appendTo(weaponsDiv);
        createButton("talk").appendTo(weaponsDiv);

        let playAgain = document.createElement("button");
        playAgain.textContent = "play again";
        playAgain.id = "playAgain";
        playAgain.addEventListener("click", () => {
            click.play();
            setTimeout(() => {
                game.innerHTML = "";
                loadGame();
            }, 150);
        });

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
            } else horn.play();
        });

        let you = result => {
            if(result === "win") {
                h1.textContent = "You sneak up on the enemy. It's your move."
            }
            if(result === "tie") {
                game.append(h1, imgDiv, playAgain);
                script = [  "It's like looking in a mirror.",
                            "You end up becoming the best of friends.",
                            "That's a win in my book."];
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
                game.append(playAgain);
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
                    playerBar.textContent = `Player : ${playerHealth}HP`;
                    h1.textContent = `The enemy's attack dealt ${computerDamage} damage.`;
                    enableButtons();
                    if(playerHealth <= 0) {
                        endFight();
                        setTimeout(() => {
                            h1.textContent = "defeat";
                            h1.style.textTransform = "uppercase";
                            h1.addEventListener("click", () => {
                                emotionalDamage.play();
                            });
                        }, 1500);
                    }
                }, 1500);
            }
            console.log(attack)
            attack.addEventListener("click", e => {
                click.play();
                disableButtons();
                let playerAttack = new Promise((resolve, reject) => {
                    computer.className = "";
                    player.className = "attack";
                    playerDamage = Math.floor(Math.random() * 3) + 1;
                    computerHealth -= playerDamage;
                    computerBar.textContent = `Computer : ${computerHealth}HP`;
                    h1.textContent = `Your attack dealt ${playerDamage} damage.`;
                    if(computerHealth > 0) {
                        resolve();
                    } else reject();

                });
                playerAttack.then(() => computerAttack()).catch(() => {
                    endFight();
                    setTimeout(() => {
                        h1.textContent = "victory";
                        h1.style.textTransform = "uppercase";
                        h1.addEventListener("click", () => {
                            window.open("https://www.youtube.com/watch?v=u9rj5s-nDvw&ab_channel=TheRealSullyG",
                            "_blank", "rel=noopener noreferrer");
                        })
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
                click.play();
                disableButtons();
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