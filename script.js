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

let rpsPlayer;

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
                rpsPlayer = e.target.id;
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
        player.classList = "player";

        let vs = document.createElement("h2");
        vs.textContent = "vs";

        let computer = document.createElement("img");
        computer.classList = "computer";

        imgDiv.append(player, vs, computer);

        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");

        class healthBar {
            constructor() {
                this.x = 0;
                this.y = 0;
                this.width = 100;
                this.height = 25;
            }

            draw() {
                context.fillStyle = "green";
                context.fillRect(this.x, this.y, this.width, this.height);
            }

            damageTaken(dmg) {
                this.width -= dmg;
                context.clearRect(0, 0, canvas.width, canvas.height);
                this.draw();
            }
        }

        let playerHealthBar = new healthBar();
        let computerHealthBar = new healthBar();

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
                    game.append(h1, canvas, imgDiv, weaponsDiv);

                    let attack = document.getElementById("attack");
                    let defend = document.getElementById("defend");
                    let talk = document.getElementById("talk");
                    let weapons = [attack, defend, talk];

                    let damage = [];
                    let computerDamage; let playerDamage;
                    let mercy = 0;

                    let action = (p, c) => {
                        switch(p + c) {
                            case "attackattack":
                                playerDamage = damage[Math.floor(Math.random() * (3 - 0 + 1) + 0)];
                                computerDamage = damage[Math.floor(Math.random() * (3 - 0 + 1) + 0)];
                                h1.textContent = `Your attack dealt ${playerDamage} damage. The enemy's attack dealt ${computerDamage} damage.`;
                                break;
                            case "defendattack":
                                computerDamage = damage[Math.floor(Math.random() * (3 - 0 + 1) + 0)];
                                h1.textContent = `You blocked the enemy's attack of ${computerDamage} damage.`;
                                break;
                            case "talkattack":
                                mercy++;
                                if(mercy === 1) {
                                    computerDamage = damage[Math.floor(Math.random() * (3 - 0 + 1) + 0)];
                                    h1.textContent = `You compliment the enemy. They are confused but attack you for ${computerDamage} damage.`;
                                } else if(mercy === 2) {
                                    computerDamage = damage[Math.floor(Math.random() * (3 - 0 + 1) + 0)];
                                    h1.textContent = "";
                                } else if(mercy === 3) {
                                    script = [];
                                    weaponsDiv.remove();
                                    game.append(playAgain);
                                    narrate();
                                }
                                break;
                        }
                    }
                                        
                    weapons.forEach(weapon => {
                        weapon.addEventListener("click", e => {
                            click.play();
                            action(e.target.id, "attack");
                        });
                    });
                    break;
                case "tie":
                    script = ["It's like looking in a mirror.", "You end up becoming the best of friends.", "Everyone wins!"];
                    game.append(h1, imgDiv, playAgain);
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
                    h1.textContent = "You sneak up on the enemy.";
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
                    h1.textContent = "The enemy used sneak attack.";
                    you("lose");
                    break;
            }
        }

        let rpsComputer = ["rock", "paper", "scissors"];

        submit(rpsPlayer, rpsComputer[Math.floor(Math.random() * rpsComputer.length)]);
    });
}

loadGame();