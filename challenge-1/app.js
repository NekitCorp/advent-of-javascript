// @ts-check

/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

class Timer {
    root = /** @type {HTMLElement} */ (document.querySelector(":root"));
    minutesInput = /** @type {HTMLInputElement} */ (
        document.getElementById("minutes")
    );
    secondsInput = /** @type {HTMLInputElement} */ (
        document.getElementById("seconds")
    );
    startButton = /** @type {HTMLButtonElement} */ (
        document.getElementById("start")
    );
    settingsButton = /** @type {HTMLButtonElement} */ (
        document.getElementById("settings")
    );
    ring = /** @type {HTMLDivElement} */ (document.getElementById("ring"));

    active = false;
    editable = false;
    /** @type {number | null} */ timeoutId = null;
    interval = 1000;
    expected = Date.now() + this.interval;
    totalParts = 2 * Math.PI * 254;
    totalSeconds = 15 * 60;

    constructor() {
        this.root.style.setProperty(
            "--total-parts",
            this.totalParts.toString()
        );
        this.root.style.setProperty("--filled-parts", "0");

        this.startButton.addEventListener("click", () =>
            this.active ? this.stop() : this.start()
        );
        this.settingsButton.addEventListener("click", () =>
            this.editable ? this.disableEdit(true) : this.enableEdit()
        );
    }

    getMinutes() {
        return clamp(parseInt(this.minutesInput.value.slice(0, 2)) || 0, 0, 59);
    }

    setMinutes(value) {
        this.minutesInput.value = ("0" + value).slice(-2);
    }

    getSeconds() {
        return clamp(parseInt(this.secondsInput.value.slice(0, 2)) || 0, 0, 60);
    }

    setSeconds(value) {
        this.secondsInput.value = ("0" + value).slice(-2);
    }

    tick = () => {
        if (!this.active) {
            return;
        }

        const dt = Date.now() - this.expected; // the drift (positive for overshooting)

        if (dt > this.interval) {
            // something really bad happened. Maybe the browser (tab) was inactive?
            // possibly special handling to avoid futile "catch up" run
            this.stop();
        }

        const minutes = this.getMinutes();
        const seconds = this.getSeconds();

        if (minutes === 0 && seconds === 1) {
            this.setSeconds(seconds - 1);
            this.stop();
            this.finish();
        }

        if (seconds > 0) {
            this.setSeconds(seconds - 1);
        } else if (minutes > 0) {
            this.setSeconds(59);
            this.setMinutes(minutes - 1);
        }

        const filledParts =
            this.totalParts -
            ((this.getMinutes() * 60 + this.getSeconds()) / this.totalSeconds) *
                this.totalParts;
        this.root.style.setProperty(
            "--filled-parts",
            Math.floor(filledParts).toString()
        );

        this.expected += this.interval;
        this.timeoutId = setTimeout(this.tick, Math.max(0, this.interval - dt)); // take into account drift
    };

    start() {
        if (this.getMinutes() > 0 || this.getSeconds() > 0) {
            this.active = true;
            this.disableEdit(this.editable);
            this.ring.classList.toggle("ending");
            this.startButton.innerText = "stop";
            this.expected = Date.now() + this.interval;
            this.settingsButton.disabled = true;

            this.timeoutId = setTimeout(this.tick, this.interval);
        }
    }

    stop() {
        this.active = false;
        this.ring.classList.toggle("ending");
        this.startButton.innerText = "start";
        this.settingsButton.disabled = false;

        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }

    enableEdit() {
        this.editable = true;
        this.minutesInput.disabled = false;
        this.secondsInput.disabled = false;
    }

    /**
     * @param {boolean} reset
     */
    disableEdit(reset) {
        this.editable = false;
        this.minutesInput.disabled = true;
        this.secondsInput.disabled = true;

        this.setMinutes(this.getMinutes());
        this.setSeconds(this.getSeconds());

        if (reset) {
            this.totalSeconds = this.getMinutes() * 60 + this.getSeconds();
            this.root.style.setProperty("--filled-parts", "0");
        }
    }

    finish() {
        alert("The timer is completed!");
    }
}

const timer = new Timer();
