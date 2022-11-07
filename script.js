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
let horn = new Audio("./audio/horn.mp3");

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
        playAgain.classList = "pressed";
        playAgain.id = "playAgain";
        playAgain.addEventListener("click", () => {
            click.play();
            setTimeout(() => {
                window.location.reload();
            }, 300);
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
            switch(result) {
                case "win":
                case "lose":
                    game.append(h1, hpDiv, imgDiv, weaponsDiv);

                    let attack = document.getElementById("attack");
                    let defend = document.getElementById("defend");
                    let talk = document.getElementById("talk");

                    let mercy = 0;

                    let computerAttack = () => {
                        setTimeout(() => {
                            computerDamage = Math.floor(Math.random() * (3 - 1 + 1) + 1);
                            playerHealth -= computerDamage;
                            playerBar.textContent = `Player : ${playerHealth}HP`;
                            h1.textContent = `The enemy's attack dealt ${computerDamage} damage.`;
                            if(playerHealth <= 0) {
                                gameOver();
                                h1.textContent = "You've lost.";
                            }
                        }, 1500);
                    }
                    
                    let gameOver = () => {
                        weaponsDiv.remove();
                        game.append(playAgain);
                    }

                    attack.addEventListener("click", e => {
                        click.play();
                        let playerAttack = new Promise((resolve, reject) => {
                            playerDamage = Math.floor(Math.random() * (3 - 1 + 1) + 1);
                            computerHealth -= playerDamage;
                            computerBar.textContent = `Computer : ${computerHealth}HP`;
                            h1.textContent = `Your attack dealt ${playerDamage} damage.`;
                            if(computerHealth > 0) {
                                resolve();
                            } else reject();

                        });
                        playerAttack.then(() => computerAttack()).catch(() => {
                            gameOver();
                            h1.textContent = "You've won."
                        });
                    });
                    
                    defend.addEventListener("click", () => {
                        click.play();
                        computerDamage = Math.floor(Math.random() * (3 - 1 + 1) + 1);
                        h1.textContent = `You blocked the enemy's attack of ${computerDamage} damage.`;
                    });
                    
                    talk.addEventListener("click", () => {
                        click.play();
                        mercy++;
                        if(playerHealth <= 0) {
                            endGame();
                        } else if(mercy === 1) {
                            h1.textContent = `You compliment the enemy. You take ${computerDamage} damage.`;
                        } else if(mercy === 2) {
                            computerDamage = Math.floor(Math.random() * (3 - 1 + 1) + 1);
                            playerHealth -= computerDamage;
                            playerBar.textContent = `Player : ${playerHealth}HP`;
                            h1.textContent = `You ask how their day was. You take ${computerDamage} damage.`;
                    
                        } else if(mercy === 3) {
                            endGame();
                            script = [  "You finally got through to them.",
                                        "You put aside your differences and had a nice conversation.",
                                        "It's a beautiful day today."];
                            narrate();
                        }
                    });


                    break;
                case "tie":
                    game.append(h1, imgDiv, playAgain);
                    script = [  "It's like looking in a mirror.",
                                "You end up becoming the best of friends.",
                                "That's a win in my book."];
                    narrate();
                    break;
            }
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
                    h1.textContent = "You sneak up on the enemy."
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
                    computerDamage = Math.floor(Math.random() * (3 - 1 + 1) + 1);
                    playerHealth -= computerDamage;
                    playerBar.textContent = `Player : ${playerHealth}HP`;
                    h1.textContent = `The enemy used sneak attack. You lose ${computerDamage}HP.`;
                    you("lose");
                    break;
            }
        }

        let computerChoice = ["rock", "paper", "scissors"];

        submit(playerChoice, computerChoice[Math.floor(Math.random() * computerChoice.length)]);
}

loadGame();