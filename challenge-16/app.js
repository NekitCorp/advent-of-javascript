const starRating = /** @type {HTMLDivElement} */ (
    document.querySelector(".star-rating")
);

let selected = 0;

/** @type {NodeListOf<HTMLAnchorElement>} */ (
    starRating.querySelectorAll(".star")
).forEach((star) => {
    const value = Number(star.dataset.star) || 0;

    star.addEventListener("mouseenter", () => {
        starRating.className = `star-rating star-${value}`;
    });

    star.addEventListener("mouseleave", () => {
        starRating.className = selected
            ? `star-rating star-${selected}`
            : "star-rating";
    });

    star.addEventListener("click", (event) => {
        event.preventDefault();
        selected = value;
        starRating.className = `star-rating star-${value}`;
    });
});
