// @ts-check

export class TableFoot {
    /** @type {number} */
    page = 1;
    rowsPerPage = 10;

    /**
     * @param {HTMLTableSectionElement} tfoot
     * @param {import("./app").DataItem[]} data
     * @param {() => void} render
     */
    constructor(tfoot, data, render) {
        /** @type {() => void} */ this.render = render;

        /** @type {number} */ this.totalPages = Math.ceil(
            data.length / this.rowsPerPage
        );

        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.colSpan = 2;
        td1.textContent = `${data.length} Results`;
        tr.appendChild(td1);

        const td2 = document.createElement("td");
        td2.colSpan = 3;
        td2.appendChild(this.createPagination());
        tr.appendChild(td2);

        tfoot.appendChild(tr);
    }

    /**
     * @returns {HTMLDivElement}
     */
    createPagination() {
        const div = document.createElement("div");
        div.className = "pagination edit";

        const previousButton = document.createElement("button");
        previousButton.id = "previous";
        previousButton.className = "previous";
        const previousImg = document.createElement("img");
        previousImg.src = "./images/chevron--left.svg";
        previousImg.alt = "Previous";
        previousButton.appendChild(previousImg);

        const input = document.createElement("input");
        input.type = "text";
        input.name = "currentPage";
        input.value = "1";
        input.id = "currentPage";

        const span1 = document.createElement("span");
        span1.textContent = " of ";

        const span2 = document.createElement("span");
        span2.id = "totalPages";
        span2.textContent = this.totalPages.toString();

        const nextButton = document.createElement("button");
        nextButton.id = "next";
        nextButton.className = "next";
        const nextImg = document.createElement("img");
        nextImg.src = "./images/chevron--right.svg";
        nextImg.alt = "next";
        nextButton.appendChild(nextImg);

        div.appendChild(previousButton);
        div.appendChild(input);
        div.appendChild(span1);
        div.appendChild(span2);
        div.appendChild(nextButton);

        input.addEventListener("input", (event) => {
            const value = /** @type {HTMLInputElement} */ (event.target).value;
            const numberValue = parseInt(value);

            if (numberValue > 0 && numberValue < this.totalPages + 1) {
                this.page = numberValue;
                this.render();
            }
        });
        input.addEventListener("focusout", () => {
            input.value = this.page.toString();
        });

        previousButton.addEventListener("click", () => {
            if (this.page !== 1) {
                this.page -= 1;
                input.value = this.page.toString();
                this.render();
            }
        });
        nextButton.addEventListener("click", () => {
            if (this.page !== this.totalPages) {
                this.page += 1;
                input.value = this.page.toString();
                this.render();
            }
        });

        return div;
    }
}
