// @ts-check

const toaster = /** @type {HTMLDivElement} */ (
    document.querySelector(".toaster")
);
const closeToaster = /** @type {HTMLButtonElement} */ (
    document.getElementById("closeToaster")
);

/**
 * @param {MouseEvent} e
 */
const mouseEvent = (e) => {
    if (!e.relatedTarget && e.clientY < 10) {
        document.removeEventListener("mouseout", mouseEvent);
        toaster.classList.remove("collapsed");
    }
};

document.addEventListener("mouseout", mouseEvent);

closeToaster.addEventListener("click", () => {
    toaster.classList.add("collapsed");
});
