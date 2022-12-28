// @ts-check

const input = /** @type {HTMLInputElement} */ (
    document.getElementById("password")
);

const options = {
    length: 12,
    symbols: true,
    numbers: true,
    lowercase: true,
    uppercase: true,
    similar: true,
};

// copy logic

/** @type {number} */
let copiedTimeout;

/** @type {HTMLButtonElement} */ (
    document.querySelector(".copy")
).addEventListener("click", (event) => {
    navigator.clipboard.writeText(input.value).then(
        () => {
            const target = /** @type {HTMLButtonElement} */ (
                event.currentTarget
            );

            clearTimeout(copiedTimeout);
            copiedTimeout = setTimeout(() => {
                target.classList.remove("copied");
            }, 2 * 1000);

            target.classList.add("copied");
        },
        (err) => console.error("Async: Could not copy text: ", err)
    );
});

// characters

const START_CODE = 33;
const END_CODE = 125;
const allChars = Array(END_CODE - START_CODE + 1)
    .fill(START_CODE)
    .map((x, y) => String.fromCharCode(x + y));
const symbols = allChars.filter((c) => /[^a-zA-Z0-9]/.test(c));
const numbers = allChars.filter((c) => /[0-9]/.test(c));
const lowercaseCharacters = allChars.filter((c) => /[a-z]/.test(c));
const uppercaseCharacters = allChars.filter((c) => /[A-Z]/.test(c));

// handlers

const lengthInput = /** @type {HTMLInputElement} */ (
    document.getElementById("length")
);
const lengthText = /** @type {HTMLSpanElement} */ (
    document.getElementById("lengthText")
);
lengthInput.addEventListener("change", (event) => {
    const value = /** @type {HTMLInputElement} */ (event.currentTarget).value;
    lengthText.textContent = `${value} characters`;
    options.length = Number(value);
    generate();
});

const symbolsInput = /** @type {HTMLInputElement} */ (
    document.getElementById("symbols")
);
symbolsInput.addEventListener("change", (event) => {
    options.symbols = /** @type {HTMLInputElement} */ (
        event.currentTarget
    ).checked;
    generate();
});

const numbersInput = /** @type {HTMLInputElement} */ (
    document.getElementById("numbers")
);
numbersInput.addEventListener("change", (event) => {
    options.numbers = /** @type {HTMLInputElement} */ (
        event.currentTarget
    ).checked;
    generate();
});

const lowercaseInput = /** @type {HTMLInputElement} */ (
    document.getElementById("lowercase")
);
lowercaseInput.addEventListener("change", (event) => {
    options.lowercase = /** @type {HTMLInputElement} */ (
        event.currentTarget
    ).checked;
    generate();
});

const uppercaseInput = /** @type {HTMLInputElement} */ (
    document.getElementById("uppercase")
);
uppercaseInput.addEventListener("change", (event) => {
    options.uppercase = /** @type {HTMLInputElement} */ (
        event.currentTarget
    ).checked;
    generate();
});

const similarInput = /** @type {HTMLInputElement} */ (
    document.getElementById("similar")
);
similarInput.addEventListener("change", (event) => {
    options.similar = /** @type {HTMLInputElement} */ (
        event.currentTarget
    ).checked;
    generate();
});

// generate password logic

function generate() {
    let data = [];

    if (options.symbols) {
        data.push(...symbols);
    }

    if (options.numbers) {
        data.push(...numbers);
    }

    if (options.lowercase) {
        data.push(...lowercaseCharacters);
    }

    if (options.uppercase) {
        data.push(...uppercaseCharacters);
    }

    if (!options.similar) {
        data = data.filter(
            (c) => !["i", "l", "1", "L", "o", "0", "O"].includes(c)
        );
    }

    console.log(data);

    input.value = new Array(options.length)
        .fill(null)
        .map(() => random(data))
        .join("");
}

/**
 * @param {string[]} array
 * @returns {string}
 */
function random(array) {
    return array[Math.floor(Math.random() * array.length)];
}

generate();
