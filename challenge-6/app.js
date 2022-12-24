const priceRange = document.getElementById("priceRange");
const dollars = document.getElementById("dollars");

priceRange.addEventListener(
    "input",
    (event) =>
        (dollars.textContent = (event.currentTarget.value / 100).toFixed(2))
);
