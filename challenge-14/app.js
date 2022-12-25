// @ts-check

const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

class Calendar {
    // elements
    wrapper = /** @type {HTMLDivElement} */ (
        document.querySelector(".wrapper")
    );
    monthElement = /** @type {HTMLDivElement} */ (
        document.querySelector(".month")
    );
    previous = /** @type {HTMLDivElement} */ (
        document.querySelector(".previous")
    );
    next = /** @type {HTMLDivElement} */ (document.querySelector(".next"));

    /**
     * @param {Date} initDate
     */
    constructor(initDate) {
        /** @type {number} */ this.month = initDate.getMonth();
        /** @type {number} */ this.year = initDate.getFullYear();
        /** @type {number} */ this.todayTime = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
        ).getTime();

        this.previous.addEventListener("click", () => {
            if (this.month === 0) {
                this.month = 11;
                this.year -= 1;
            } else {
                this.month -= 1;
            }
            this.render();
        });
        this.next.addEventListener("click", () => {
            if (this.month === 11) {
                this.month = 0;
                this.year += 1;
            } else {
                this.month += 1;
            }
            this.render();
        });

        this.render();
    }

    render() {
        /** @type {number[]} */ this.days = this.getDays(this.year, this.month);

        console.log(this.month, this.year, this.days);

        // set month name
        this.monthElement.textContent = MONTH_NAMES[this.month];

        // render days
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                const dayIndex = i * 7 + j;
                const day = this.days[dayIndex];
                let dayElement = document.getElementById(`day-${dayIndex}`);

                if (day === undefined) {
                    if (dayElement) {
                        dayElement.remove();
                    }

                    continue;
                }

                if (dayElement) {
                    dayElement.textContent = day === 0 ? "" : day.toString();
                } else {
                    dayElement = this.createDayDiv(dayIndex, day);
                }

                if (
                    new Date(this.year, this.month, day).getTime() ===
                    this.todayTime
                ) {
                    dayElement.classList.add("today");
                } else {
                    dayElement.classList.remove("today");
                }
            }
        }
    }

    /**
     * @param {number} year
     * @param {number} month
     * @returns {number[]}
     */
    getDays(year, month) {
        return [
            ...new Array(this.startOfMonth(year, month).getDay()).fill(0),
            ...Array.from(
                { length: this.endOfMonth(year, month).getDate() },
                (_, i) => i + 1
            ),
            ...new Array(6 - this.endOfMonth(year, month).getDay()).fill(0),
        ];
    }

    /**
     * @param {number} year
     * @param {number} month
     * @returns {Date}
     */
    startOfMonth(year, month) {
        return new Date(year, month, 1);
    }

    /**
     * @param {number} year
     * @param {number} month
     * @returns {Date}
     */
    endOfMonth(year, month) {
        return new Date(year, month + 1, 0);
    }

    /**
     * @param {number} index
     * @param {number} day
     * @returns {HTMLDivElement}
     */
    createDayDiv(index, day) {
        const div = document.createElement("div");

        div.id = `day-${index}`;
        div.textContent = day ? `${day}` : "";
        this.wrapper.appendChild(div);

        return div;
    }
}

new Calendar(new Date());
