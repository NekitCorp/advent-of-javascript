// @ts-check

const verticalPadding = 30;

document.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", (event) => {
        event.preventDefault();

        const target = /** @type {HTMLAnchorElement} */ (event.currentTarget);
        const content = /** @type {HTMLDivElement} */ (
            target.nextElementSibling
        );
        const li = /** @type {HTMLLIElement} */ (target.parentElement);

        console.log(target, target.nextElementSibling);

        if (li.classList.contains("expand")) {
            li.classList.remove("expand");
            content.style.setProperty("--max-height", 0 + "px");
            content.style.setProperty("--padding", 0 + "px");
        } else {
            li.classList.add("expand");
            content.style.setProperty(
                "--max-height",
                content.scrollHeight + 2 * verticalPadding + "px"
            );
            content.style.setProperty("--padding", verticalPadding + "px");
        }
    });
});
