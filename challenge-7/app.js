// @ts-check

const form = /** @type {HTMLFormElement} */ (document.getElementById("form"));
const tipAmount = /** @type {HTMLSpanElement} */ (
    document.getElementById("tip-amount")
);
const totalPerPerson = /** @type {HTMLSpanElement} */ (
    document.getElementById("total-per-person")
);

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const values = Object.fromEntries(
        new FormData(/** @type {HTMLFormElement} */ (event.target))
    );

    const billAmount = parseFloat(values["bill-amount"].toString()) || 0;
    const numberOfPeople = parseInt(values["number-of-people"].toString()) || 0;
    const tip = parseInt(values["tip"].toString().replace("%", "")) || 0;

    tipAmount.textContent = ((billAmount * tip) / 100).toFixed(2);
    totalPerPerson.textContent = (
        (billAmount * ((100 + tip) / 100)) /
        numberOfPeople
    ).toFixed(2);
});
