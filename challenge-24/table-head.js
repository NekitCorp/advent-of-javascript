// @ts-check

export class TableHead {
    /** @type {string} */
    sortName = "";
    /** @type {"ascending" | "descending"} */
    sortDirection = "ascending";

    /**
     * @param {HTMLTableSectionElement} thead
     * @param {import("./app").HeaderItem[]} items
     * @param {() => void} render
     */
    constructor(thead, items, render) {
        /** @type {() => void} */ this.render = render;
        /** @type {import("./app").HeaderItem[]} */ this.items = items;
        /** @type {HTMLTableRowElement} */ this.tr =
            document.createElement("tr");

        items.forEach((item, i) =>
            this.tr.appendChild(this.createTh(item, i === 0))
        );

        this.tr.appendChild(document.createElement("th"));
        thead.appendChild(this.tr);
    }

    /**
     * @param {import("./app").HeaderItem} item
     * @param {boolean} isFirst
     * @returns {HTMLTableCellElement}
     */
    createTh(item, isFirst) {
        const th = document.createElement("th");
        const button = this.createSortButton();

        if (isFirst) {
            th.classList.add("header__id");
        }

        button.addEventListener("click", () => {
            this.tr.querySelectorAll("button.sort").forEach((button) => {
                button.classList.remove("ascending");
                button.classList.remove("descending");
            });

            if (this.sortName === item.name) {
                this.sortDirection =
                    this.sortDirection === "ascending"
                        ? "descending"
                        : "ascending";
            } else {
                this.sortName = item.name;
                this.sortDirection = "ascending";
            }

            if (this.sortName) {
                const index = this.items.findIndex(
                    (h) => h.name === this.sortName
                );
                this.tr.children[index]
                    .querySelector("button")
                    ?.classList.add(this.sortDirection);
            }

            this.render();
        });

        th.appendChild(document.createTextNode(item.title));
        th.appendChild(button);

        return th;
    }

    /**
     * @returns {HTMLButtonElement}
     */
    createSortButton() {
        const button = document.createElement("button");
        button.className = "sort";

        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );
        svg.setAttribute("width", "17");
        svg.setAttribute("height", "21");
        svg.setAttribute("fill", "none");
        svg.setAttribute("viewBox", "0 0 17 21");

        const path1 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        path1.classList.add("ascending");
        path1.setAttribute(
            "d",
            "M16.9706 8.48528L8.48529 0L9.29832e-06 8.48528H16.9706Z"
        );

        const path2 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        path2.classList.add("descending");
        path2.setAttribute(
            "d",
            "M1.00136e-05 12.4853L8.48529 20.9706L16.9706 12.4853L1.00136e-05 12.4853Z"
        );

        svg.append(path1, path2);
        button.appendChild(svg);

        return button;
    }
}
