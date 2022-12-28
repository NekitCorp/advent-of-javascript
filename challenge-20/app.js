// @ts-check

/**
 * @typedef {Object} Episode
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} cover
 * @property {string} link
 */

/** @type {Episode[]} */
const episodes = [
    {
        id: 39,
        title: "Tech to Look Forward to in 2022",
        description:
            "In this episode, Amy and James discuss the future of web development: Astro, Veet, Supabase, SvelteKit, Redwood.js, Blitz.js, GitHub Co-Pilot, Web Assembly, Blockchain, w3, no-code, and low-code.",
        cover: "cover__episode-39.png",
        link: "https://www.compressed.fm/episode/39",
    },
    {
        id: 38,
        title: "2021 Gift Guide",
        description:
            "This episode is full of picks! Amy and James talk about all of their favorite things, just in time for the holidays.",
        cover: "cover__episode-38.png",
        link: "https://www.compressed.fm/episode/38",
    },
    {
        id: 37,
        title: "Building a Course",
        description:
            "In this episode, Amy and James discuss all the things that go into course creation: why? What? How? Where to Host? Building the right audience.",
        cover: "cover__episode-37.png",
        link: "https://www.compressed.fm/episode/37",
    },
    {
        id: 36,
        title: "SVGs FTW",
        description:
            "In this episode, Amy and James discuss all things SVGs: what is, why and when to reach for it, and seven different ways to get an SVG on the page, and the pros and cons of each method.",
        cover: "cover__episode-36.png",
        link: "https://www.compressed.fm/episode/36",
    },
    {
        id: 35,
        title: "Crossover Episode with Purrfect Dev",
        description:
            "This is a crossover episode with our friends, Alex Patterson and Brittney Postma from the Purrfect.dev podcast. In this episode, we all discuss our jobs. Even though we're all in tech, our day- to - day work looks vastly different.",
        cover: "cover__episode-35.png",
        link: "https://www.compressed.fm/episode/35",
    },
    {
        id: 34,
        title: "Getting git",
        description:
            "In this episode, Amy and James explain the fundamentals of git and their most-used commands. They also explain basic different workflows, if you're working with a team or by yourself.",
        cover: "cover__episode-34.png",
        link: "https://www.compressed.fm/episode/34",
    },
    {
        id: 33,
        title: "Small Design Tweaks that Make All the Difference",
        description:
            "In this episode, Amy and James talk about small design tweaks that you can make that will make a big difference. These recommendations are helpful if you're looking for basic principles and guidelines to take your site to the next level.",
        cover: "cover__episode-33.png",
        link: "https://www.compressed.fm/episode/33",
    },
];

/**
 * @param {Episode} episode
 */
function createTab(episode) {
    const li = document.createElement("li");
    li.dataset.id = episode.id.toString();

    const a = document.createElement("a");
    a.href = "#";
    li.appendChild(a);
    a.addEventListener("click", (event) => {
        event.preventDefault();
        selectTab(episode.id);
    });

    const episodeDiv = document.createElement("div");
    episodeDiv.className = "episode";
    episodeDiv.textContent = `Episode ${episode.id}`;
    a.appendChild(episodeDiv);

    const titleDiv = document.createElement("div");
    titleDiv.className = "title";
    titleDiv.textContent = episode.title;
    a.appendChild(titleDiv);

    return li;
}

/**
 * @param {number} id
 */
function selectTab(id) {
    const episode = episodes.find((e) => e.id === id);

    tabs.querySelectorAll("li").forEach((li) =>
        li.classList.remove("selected")
    );
    tabs.querySelector(`li[data-id="${id}"]`)?.classList.add("selected");

    cover.src = `./images/${episode?.cover}`;
    cover.alt = `Episode ${episode?.id}`;

    /** @type {HTMLHeadingElement} */ (
        content.querySelector("h1")
    ).textContent = episode?.title ?? "";
    /** @type {HTMLParagraphElement} */ (
        content.querySelector("p")
    ).textContent = episode?.description ?? "";
    /** @type {HTMLAnchorElement} */ (content.querySelector(".more")).href =
        episode?.link ?? "";
}

const tabs = /** @type {HTMLUListElement} */ (document.getElementById("tabs"));
const cover = /** @type {HTMLImageElement} */ (
    document.querySelector(".cover img")
);
const content = /** @type {HTMLDivElement} */ (
    document.querySelector(".content")
);

episodes.forEach((ep) => tabs.appendChild(createTab(ep)));

selectTab(episodes[0].id);
