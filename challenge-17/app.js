// @ts-check

// https://benfrain.com/building-a-table-of-contents-with-active-indicator-using-javascript-intersection-observers/

const ul = /** @type {HTMLUListElement} */ (
    document.querySelector(".content ul")
);

const h3tags = /** @type {NodeListOf<HTMLHeadingElement>} */ (
    document.querySelectorAll(".content main h3")
);

/**
 * Intersection Observer Options
 * @type {IntersectionObserverInit}
 */
const options = {
    root: null,
    rootMargin: "0px",
    threshold: [1],
};

// Each Intersection Observer runs setCurrent
const observeTags = new IntersectionObserver(setCurrent, options);

/**
 * Function that runs when the Intersection Observer fires
 * @type {IntersectionObserverCallback}
 */
function setCurrent(e) {
    var lis = /** @type {NodeListOf<HTMLLIElement>} */ (
        ul.querySelectorAll("li")
    );

    e.map((i) => {
        if (i.isIntersecting === true) {
            lis.forEach((li) => li.classList.remove("selected"));
            document
                .querySelector(`li[data-h="${i.target.id}"]`)
                ?.classList.add("selected");
        }
    });
}

// Build the DOM for the menu
function createTOC() {
    h3tags.forEach((el, i) => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        li.dataset.h = `h-${i}`;
        a.href = `#h-${i}`;
        a.textContent = el.textContent;
        el.id = `h-${i}`;

        li.appendChild(a);
        ul.appendChild(li);
    });

    // Now
    h3tags.forEach((tag) => {
        observeTags.observe(tag);
    });
}

createTOC();
