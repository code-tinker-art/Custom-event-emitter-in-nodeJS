export class EventEmitter {
    #events;
    #maxListeners;
    constructor() {
        this.#events = {};
        this.#maxListeners = 10;
    }

    set maxListeners(num) {
        if (typeof num !== "number") {
            console.error("Expected number as parameter in setMaxListeners")
            return;
        }
        this.#maxListeners = num;
    }

    get maxListeners() {
        return this.#maxListeners;
    }

    listen(ident, func) {
        if (typeof func !== "function" || !ident) {
            console.error("Expected parameters were not passed");
            return
        }

        if (!this.#events[ident])
            this.#events[ident] = [];

        if (this.#events[ident].length + 1 > this.#maxListeners) {
            console.error("Too many listeners. Update the number of maxlisteners to listen for more events")
            return;
        }

        this.#events[ident].push(func)
    }

    emit(ident, ...args) {
        if (!this.#events[ident]) {
            //console.error(`Listener for ${ident} was not found`);
            return;
        }

        for (const fn of this.#events[ident]) {
            fn(...args);
        }
    }

    removeListener(ident, func) {
        if (!this.#events[ident]) return;

        if(!func)
            delete this.#events[ident];
        else
            this.#events[ident] = this.#events[ident].filter(f => f !== func)
    }

    getEventListeners() {
        return this.#events;
    }
}


