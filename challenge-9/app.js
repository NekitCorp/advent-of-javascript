// @ts-check

/**
 * @typedef {Object} Item
 * @property {string} image
 * @property {string} caption
 */

/** @type {Item[]} */
const content = [
    {
        image: "dave-hoefler-okUIdo6NxGo-unsplash.jpg",
        caption: "Photo by Dave Hoefler on Unsplash",
    },
    {
        image: "sherman-yang-VBBGigIuaDY-unsplash.jpg",
        caption: "Photo by Sherman Yang n Unsplash",
    },
    {
        image: "jakob-owens-EwRM05V0VSI-unsplash.jpg",
        caption: "Photo by Jakob Owens on Unsplash",
    },
    {
        image: "finding-dan-dan-grinwis-O35rT6OytRo-unsplash.jpg",
        caption: "Photo by Dan Grinwis on Unsplash",
    },
    {
        image: "vincentiu-solomon-ln5drpv_ImI-unsplash.jpg",
        caption: "Photo by Vincentiu Solomon on Unsplash",
    },
    {
        image: "silas-baisch-Wn4ulyzVoD4-unsplash.jpg",
        caption: "Photo by Silas Baisch on Unsplash",
    },
    {
        image: "eugene-golovesov-EXdXp7Z4X4w-unsplash.jpg",
        caption: "Photo by Eugene Golovesov on Unsplash",
    },
    {
        image: "jennifer-reynolds-_8HI5xf4TkE-unsplash.jpg",
        caption: "Photo by Jennifer reynolds on Unsplash",
    },
    {
        image: "kellen-riggin-SIBOiXKg0Ds-unsplash.jpg",
        caption: "Photo by Kellen Riggin on Unsplash",
    },
    {
        image: "rafael-hoyos-weht-zhkAp8DGkxw-unsplash.jpg",
        caption: "Photo by Rafael Hoyos on Unsplash",
    },
    {
        image: "sonya-romanovska-wzdXhyi3AiM-unsplash.jpg",
        caption: "Photo by Sonya Romanovska on Unsplash",
    },
];

/**
 * @param {string} src
 * @param {string} alt
 * @returns {HTMLImageElement}
 */
function createImage(src, alt) {
    const img = document.createElement("img");

    img.src = "images/" + src;
    img.alt = alt;

    return img;
}

/**
 * @param {Item} item
 * @param {number} index
 * @returns {HTMLLIElement}
 */
function createThumbnail(item, index) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = createImage(item.image, "");

    a.href = "#";
    a.addEventListener("click", (event) => {
        event.preventDefault();
        select(index);
    });

    li.appendChild(a);
    a.appendChild(img);

    return li;
}

let currentIndex = 0;

const thumbnails = /** @type {HTMLUListElement} */ (
    document.querySelector(".thumbnails > ul")
);

const contentLis = content.map((item, i) => {
    const li = createThumbnail(item, i);
    thumbnails.appendChild(li);
    return li;
});

select(currentIndex);

const left = /** @type {HTMLAnchorElement} */ (document.querySelector(".left"));
left.addEventListener("click", (event) => {
    event.preventDefault();

    if (currentIndex > 0 && currentIndex < content.length) {
        select(currentIndex - 1);
    }
});

const right = /** @type {HTMLAnchorElement} */ (
    document.querySelector(".right")
);
right.addEventListener("click", (event) => {
    event.preventDefault();

    if (currentIndex >= 0 && currentIndex < content.length - 1) {
        select(currentIndex + 1);
    }
});

/**
 * @param {number} index
 */
function select(index) {
    const item = content[index];

    contentLis[currentIndex].classList.remove("selected");
    contentLis[index].classList.add("selected");
    currentIndex = index;

    const featureImage = /** @type {HTMLImageElement} */ (
        document.querySelector(".feature > img")
    );
    const featureCaption = /** @type {HTMLDivElement} */ (
        document.querySelector(".feature > .caption")
    );

    featureImage.src = "images/" + item.image;
    featureCaption.textContent = item.caption;

    contentLis[index].scrollIntoView({ behavior: "smooth", inline: "center" });
}
