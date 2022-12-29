// @ts-check

export class TableRow {
    /**
     * @param {import("./app").DataItem} item
     */
    constructor(item) {
        /** @type {import("./app").DataItem} */ this.item = item;
        /** @type {HTMLTableRowElement} */ this.tr = this.createTr();
    }

    /**
     * @returns {HTMLTableRowElement}
     */
    createTr() {
        const tr = document.createElement("tr");

        Object.entries(this.item).forEach(([key, value], i) => {
            tr.appendChild(this.createTd(key, value, i));
        });

        const editTd = this.createEditTd(this.item.id);
        tr.appendChild(editTd);

        return tr;
    }

    /**
     * @param {number | string} id
     * @returns {HTMLTableCellElement}
     */
    createEditTd(id) {
        const td = document.createElement("td");

        const button1 = document.createElement("button");
        button1.classList.add("update");
        button1.name = `update-${id}`;
        button1.id = `update-${id}`;

        const img1 = document.createElement("img");
        img1.src = "./images/update.svg";
        img1.alt = "Update";
        img1.classList.add("update");

        button1.appendChild(img1);
        td.appendChild(button1);

        button1.addEventListener("click", this.edit);

        const button2 = document.createElement("button");
        button2.classList.add("edit");
        button2.name = `edit-${id}`;
        button2.id = `edit-${id}`;

        const img2 = document.createElement("img");
        img2.src = "./images/edit.svg";
        img2.alt = "Edit";
        img2.classList.add("edit");

        button2.appendChild(img2);
        td.appendChild(button2);

        button2.addEventListener("click", this.update);

        return td;
    }

    update = () => {
        this.tr.querySelectorAll("input").forEach((i) => (i.disabled = false));
        this.tr.classList.add("edit");
    };

    edit = () => {
        this.tr.querySelectorAll("input").forEach((i) => {
            i.disabled = true;
            const name = i.name.split("-")[0];
            this.item[name] = i.value;
        });
        this.tr.classList.remove("edit");
    };

    /**
     * @param {string} name
     * @param {string | number} value
     * @param {number} index
     * @returns {HTMLTableCellElement}
     */
    createTd(name, value, index) {
        const td = document.createElement("td");

        if (name === "id") {
            td.appendChild(document.createTextNode(`${value}`));
            return td;
        }

        if (name === "name") {
            td.classList.add("name");
        }

        // <input type="text" disabled="disabled" name="person-email-1" value="cameron.williams@example.com">
        const input = document.createElement("input");
        input.type = "text";
        input.disabled = true;
        input.name = `${name}-${index}`;
        input.value = `${value}`;

        td.appendChild(input);

        return td;
    }
}
