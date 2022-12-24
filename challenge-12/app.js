// @ts-check

const picks = ["rock", "paper", "scissors"];

document.querySelectorAll("button").forEach((button, i) => {
    const playerPick = button.dataset.pick;

    if (playerPick) {
        button.addEventListener("click", () => {
            const searchParams = new URLSearchParams();
            searchParams.set("player", playerPick);
            searchParams.set(
                "computer",
                picks[Math.floor(Math.random() * picks.length)]
            );

            window.location.href = `winner.html?${searchParams}`;
        });
    }
});
