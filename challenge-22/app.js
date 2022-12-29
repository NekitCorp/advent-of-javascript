// @ts-check

const cardNumberInput = /** @type {HTMLInputElement} */ (
    document.querySelector('input[name="card-number"]')
);
const cardNumberEmboss = /** @type {HTMLDivElement} */ (
    document.querySelector(".card-number__emboss")
);
const cardNumberShadow = /** @type {HTMLDivElement} */ (
    document.querySelector(".card-number__shadow")
);

const cardHolderInput = /** @type {HTMLInputElement} */ (
    document.querySelector('input[name="card-holder"]')
);
const cardHolderEmboss = /** @type {HTMLDivElement} */ (
    document.querySelector(".card-holder__emboss")
);
const cardHolderShadow = /** @type {HTMLDivElement} */ (
    document.querySelector(".card-holder__shadow")
);
const signature = /** @type {HTMLDivElement} */ (
    document.querySelector(".signature")
);

const expirationDateMonthInput = /** @type {HTMLSelectElement} */ (
    document.querySelector('select[name="expiration-date-month"]')
);
const expirationDateYearInput = /** @type {HTMLSelectElement} */ (
    document.querySelector('select[name="expiration-date-year"]')
);
const expirationDateEmboss = /** @type {HTMLDivElement} */ (
    document.querySelector(".expiration-date__emboss")
);
const expirationDateShadow = /** @type {HTMLDivElement} */ (
    document.querySelector(".expiration-date__shadow")
);

const cvvInput = /** @type {HTMLInputElement} */ (
    document.querySelector('input[name="cvv"]')
);
const cvv = /** @type {HTMLDivElement} */ (document.querySelector(".cvv"));

const wrapper = /** @type {HTMLDivElement} */ (
    document.querySelector(".credit-card__wrapper")
);

const cardMapper = {
    3: "american",
    4: "visa",
    5: "mastercard",
    6: "discover",
};

cardNumberInput.addEventListener("keypress", (event) => {
    if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
    }
});
cardNumberInput.addEventListener("input", (event) => {
    const value = /** @type {HTMLInputElement} */ (event.target).value.replace(
        /(\d{4}(?!\s))/g,
        "$1 "
    );

    cardNumberEmboss.textContent = ` ${value} `;
    cardNumberShadow.textContent = ` ${value} `;

    Object.values(cardMapper).forEach((c) => wrapper.classList.remove(c));
    wrapper.classList.add(cardMapper[value[0]] ?? "discover");
});

cardHolderInput.addEventListener("input", (event) => {
    const value = /** @type {HTMLInputElement} */ (event.target).value;

    cardHolderEmboss.textContent = value;
    cardHolderShadow.textContent = value;
    signature.textContent = value;
});

expirationDateMonthInput.addEventListener("change", expirationChange);
expirationDateYearInput.addEventListener("change", expirationChange);
function expirationChange() {
    expirationDateEmboss.textContent = `${expirationDateMonthInput.value}/${expirationDateYearInput.value}`;
    expirationDateShadow.textContent = `${expirationDateMonthInput.value}/${expirationDateYearInput.value}`;
}

cvvInput.addEventListener("focus", () => {
    wrapper.classList.add("flip");
});
cvvInput.addEventListener("focusout", () => {
    wrapper.classList.remove("flip");
});
cvvInput.addEventListener("keypress", (event) => {
    if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
    }
});
cvvInput.addEventListener("input", (event) => {
    const value = /** @type {HTMLInputElement} */ (event.target).value;
    cvv.textContent = ` ${value} `;
});
