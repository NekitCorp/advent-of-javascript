// @ts-check

const piano = /** @type {HTMLDivElement} */ (document.getElementById("piano"));
const keys = piano.querySelectorAll("a");

keys.forEach((key, i) => {
    const audio = new Audio(`audio/key-${i + 1}.mp3`);

    key.addEventListener("click", () =>
        /** @type {HTMLAudioElement} */ (audio.cloneNode()).play()
    );
});
