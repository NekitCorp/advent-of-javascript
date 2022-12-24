// @ts-check

const inputs = /** @type {NodeListOf<HTMLInputElement>} */ (
    document.querySelectorAll('input[type="text"]')
);

inputs.forEach((input, i) => {
    input.addEventListener("keydown", (event) => {
        if (event.ctrlKey || event.metaKey) {
            return false;
        }

        if (event.key.match(/[0-9]/)) {
            window.requestAnimationFrame(() => {
                if (inputs[i + 1]) {
                    inputs[i + 1].focus();
                } else {
                    document.querySelector("button")?.focus();
                }
            });

            return event;
        } else {
            event.preventDefault();
        }
    });

    input.addEventListener("paste", (event) => {
        console.log(event);

        event.preventDefault();

        let paste = event.clipboardData?.getData("text");

        if (paste?.match(/^[0-9]{4}$/)) {
            paste.split("").forEach((n, i) => {
                inputs[i].value = n;
            });
        }
    });
});
