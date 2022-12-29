// @ts-check
import { TableFoot } from "./table-foot.js";
import { TableHead } from "./table-head.js";
import { TableRow } from "./table-row.js";

export class Table {
    currentPageInput = /** @type {HTMLInputElement} */ (
        document.getElementById("currentPage")
    );
    previousButton = /** @type {HTMLButtonElement} */ (
        document.getElementById("previous")
    );
    nextButton = /** @type {HTMLButtonElement} */ (
        document.getElementById("next")
    );

    /**
     * @param {HTMLTableElement | null} table
     * @param {import("./app").HeaderItem[]} header
     * @param {import("./app").DataItem[]} data
     */
    constructor(table, header, data) {
        if (!table) return;

        /** @type {HTMLTableSectionElement} */ this.thead =
            document.createElement("thead");
        /** @type {HTMLTableSectionElement} */ this.tbody =
            document.createElement("tbody");
        /** @type {HTMLTableSectionElement} */ this.tfoot =
            document.createElement("tfoot");

        table.append(this.thead, this.tbody, this.tfoot);

        /** @type {import("./app").HeaderItem[]} */ this.header = header;
        /** @type {import("./app").DataItem[]} */ this.data = data;
        /** @type {TableHead} */ this.tableHead = new TableHead(
            this.thead,
            header,
            this.render
        );
        /** @type {TableFoot} */ this.tableFoot = new TableFoot(
            this.tfoot,
            data,
            this.render
        );

        // render
        this.render();
    }

    render = () => {
        this.tbody.replaceChildren(
            ...this.data
                .sort((a, b) => {
                    const af = a[this.tableHead.sortName];
                    const bf = b[this.tableHead.sortName];

                    if (typeof af === "number" && typeof bf === "number") {
                        return this.tableHead.sortDirection === "ascending"
                            ? af - bf
                            : bf - af;
                    }

                    return (
                        ("" + af).localeCompare("" + bf) *
                        (this.tableHead.sortDirection === "ascending" ? 1 : -1)
                    );
                })
                .slice(
                    this.tableFoot.rowsPerPage * (this.tableFoot.page - 1),
                    this.tableFoot.rowsPerPage * (this.tableFoot.page - 1) +
                        this.tableFoot.rowsPerPage
                )
                .map((item) => new TableRow(item).tr)
        );
    };
}
