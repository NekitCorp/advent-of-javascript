// @ts-check

const keyboard = /** @type {HTMLDivElement} */ (
    document.querySelector(".keyboard")
);
/** @type {NodeListOf<HTMLDivElement>} */
const keys = keyboard.querySelectorAll(".key");
let key = getRandomKey();
key.classList.add("jiggle");

function getRandomKey() {
    return keys[Math.floor(Math.random() * keys.length)];
}

document.addEventListener("keydown", (event) => {
    if (event.key.toUpperCase() === key.dataset.key?.toUpperCase()) {
        key.classList.remove("jiggle");
        key = getRandomKey();
        key.classList.add("jiggle");
    }
});
