// @ts-check

const params = new URLSearchParams(window.location.search);
const player = params.get("player");
const computer = params.get("computer");

const winPick = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
};

/** @type {HTMLImageElement} */ (
    document.querySelector(".your-pick img")
).src = `./images/${player}.png`;
/** @type {HTMLImageElement} */ (
    document.querySelector(".computer-pick img")
).src = `./images/${computer}.png`;

if (player === computer) {
    document.body.classList.add("draw");
} else if (winPick[player] === computer) {
    document.body.classList.add("you-win");
} else {
    document.body.classList.add("computer-wins");
}

/** @type {HTMLButtonElement} */ (
    document.querySelector(".play-again")
).addEventListener("click", () => {
    window.location.href = "index.html";
});
