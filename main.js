export class EventEmitter {
    #events;
    #maxListeners;
    #onceEvents;

    constructor() {
        this.#events = {};
        this.#maxListeners = 10;
        this.#onceEvents = {};
    }

    set maxListeners(num) {
        if (typeof num !== "number") {
            console.error("Expected number as parameter in setMaxListeners");
            return;
        }
        this.#maxListeners = num;
    }

    get maxListeners() {
        return this.#maxListeners;
    }

    once(ident, func) {
        if (typeof func !== "function" || !ident) {
            console.error("Expected parameters were not passed");
            return;
        }

        if (!this.#onceEvents[ident])
            this.#onceEvents[ident] = [];

        if (this.#onceEvents[ident].length + 1 > this.#maxListeners) {
            console.error("Too many listeners. Update the number of maxlisteners to listen for more events");
            return;
        }

        this.#onceEvents[ident].push(func);
    }

    listen(ident, func) {
        if (typeof func !== "function" || !ident) {
            console.error("Expected parameters were not passed");
            return;
        }

        if (!this.#events[ident])
            this.#events[ident] = [];

        if (this.#events[ident].length + 1 > this.#maxListeners) {
            console.error("Too many listeners. Update the number of maxlisteners to listen for more events");
            return;
        }

        this.#events[ident].push(func);
    }

    emit(ident, ...args) {
        if (!this.#events[ident] && !this.#onceEvents[ident]) {
            return;
        }

        if (this.#events[ident]) {
            for (const fn of this.#events[ident]) {
                fn(...args);
            }
        }

        if (this.#onceEvents[ident]) {
            for (const fn of this.#onceEvents[ident]) {
                fn(...args);
            }
            delete this.#onceEvents[ident]; 
        }
    }

    removeListener(ident, func) {
        if (!func) {
            delete this.#events[ident];
            delete this.#onceEvents[ident];
            return;
        }

        if (this.#events[ident]) {
            this.#events[ident] = this.#events[ident].filter(f => f !== func);
        }
        if (this.#onceEvents[ident]) {
            this.#onceEvents[ident] = this.#onceEvents[ident].filter(f => f !== func);
        }
    }
}