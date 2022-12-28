// @ts-check

const nameField = /** @type {HTMLDivElement} */ (
    document.getElementById("name")
);
const emailField = /** @type {HTMLDivElement} */ (
    document.getElementById("email")
);
const passwordField = /** @type {HTMLDivElement} */ (
    document.getElementById("password")
);
const confirmPasswordField = /** @type {HTMLDivElement} */ (
    document.getElementById("confirm-password")
);
const submit = /** @type {HTMLInputElement} */ (
    document.querySelector('input[type="submit"]')
);

const valid = {
    name: false,
    email: false,
    password: false,
    "confirm-password": false,
};

/**
 * @param {HTMLDivElement} field
 * @param {(value: string) => boolean} validator
 * @param {string} validator
 */
function createFieldHandler(field, validator, errorText) {
    field.querySelector("input")?.addEventListener("focusout", (event) => {
        const target = /** @type {HTMLInputElement} */ (event.currentTarget);
        const error = /** @type {HTMLDivElement} */ (
            field.querySelector(".error")
        );
        const success = /** @type {HTMLDivElement} */ (
            field.querySelector(".success")
        );

        error.replaceChildren();
        success.replaceChildren();

        if (validator(target.value)) {
            valid[target.name] = true;
            success.append(...createSuccessContent());
        } else {
            valid[target.name] = false;
            error.append(...createErrorContent(errorText));
        }

        checkIsValid();
    });

    field.querySelector(".show-hide")?.addEventListener("click", () => {
        const passwordInput = field.querySelector("input");

        if (passwordInput) {
            if (field.classList.contains("show")) {
                passwordInput.type = "password";
            } else {
                passwordInput.type = "text";
            }

            field.classList.toggle("show");
        }
    });
}

function checkIsValid() {
    if (Object.values(valid).every(Boolean)) {
        submit.disabled = false;
    } else {
        submit.disabled = true;
    }
}

/**
 * <img src="./images/success.svg" alt="Success">
 * @returns {Node[]}
 */
function createSuccessContent() {
    const img = document.createElement("img");
    img.src = "./images/success.svg";
    img.alt = "Success";
    return [img];
}

/**
 * <img src="./images/error.svg" alt="Error" />
 * A name is required
 * @param {string} error
 * @returns {Node[]}
 */
function createErrorContent(error) {
    const img = document.createElement("img");
    img.src = "./images/error.svg";
    img.alt = "Error";
    const text = document.createTextNode(error);
    return [img, text];
}

createFieldHandler(nameField, Boolean, "A name is required");
createFieldHandler(
    emailField,
    (value) => /\S+@\S+\.\S+/.test(value),
    "Must enter a valid email"
);
createFieldHandler(passwordField, Boolean, "A password is required");
createFieldHandler(
    confirmPasswordField,
    (value) => passwordField.querySelector("input")?.value === value,
    "Password and confirm password must match"
);
