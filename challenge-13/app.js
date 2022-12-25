const overlay = document.querySelector(".overlay");

document.getElementById("something").addEventListener("click", (event) => {
    event.preventDefault();
    overlay.classList.remove("closed");
});

document.querySelector(".close").addEventListener("click", () => {
    overlay.classList.add("closed");
});
