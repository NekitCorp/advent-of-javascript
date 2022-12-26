// @ts-check

import { sampleAPIResponse } from "./sampleData.js";

const gallery = /** @type {HTMLUListElement} */ (
    document.querySelector(".gallery")
);

/**
 * @param {(typeof sampleAPIResponse)['items'][0]} item
 * @returns {HTMLLIElement}
 */
function createGalleryItem(item) {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.classList.add("video");
    li.appendChild(a);

    const img = document.createElement("img");
    img.src = item.snippet.thumbnails.default.url;
    img.alt = "";
    img.width = item.snippet.thumbnails.default.width;
    img.height = item.snippet.thumbnails.default.height;
    a.appendChild(img);

    const h3 = document.createElement("h3");
    h3.textContent = item.snippet.title;
    a.appendChild(h3);

    a.addEventListener("click", (event) => {
        event.preventDefault();
        setFeature(item);
    });

    return li;
}

/**
 * @param {(typeof sampleAPIResponse)['items'][0]} item
 */
function setFeature(item) {
    const feature = /** @type {HTMLDivElement} */ (
        document.querySelector(".feature")
    );

    const iframe = /** @type {HTMLIFrameElement} */ (
        feature.querySelector("iframe")
    );
    iframe.src = `https://www.youtube.com/embed/${item.id.videoId}`;

    const h1 = /** @type {HTMLHeadingElement} */ (feature.querySelector("h1"));
    h1.textContent = item.snippet.title;

    const p = /** @type {HTMLParagraphElement} */ (feature.querySelector("p"));
    p.textContent = item.snippet.description;
}

setFeature(sampleAPIResponse.items[0]);

sampleAPIResponse.items.forEach((item) =>
    gallery.appendChild(createGalleryItem(item))
);
