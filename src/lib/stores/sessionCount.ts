import { writable } from "svelte/store";

function createSessionCount() {
    const sessionCount = writable<number>(0);

    function increment() {
        sessionCount.update((n) => {
            const count = n + 1;
            writeToLocalStorage(count);
            return count;
        });
    }

    function decrement() {
        sessionCount.update((n) => {
            const count = n - 1;
            writeToLocalStorage(count);
            return count;
        });
    }

    function reset() {
        sessionCount.update((n) => {
            const count = 0;
            writeToLocalStorage(count);
            return count;
        });
    }

    return {
        ...sessionCount,
        increment,
        decrement,
        reset,
    };
}

function writeToLocalStorage(value: number) {
    localStorage.setItem("sessionCount", JSON.stringify(value));
    localStorage.setItem("sessionCountDate", JSON.stringify(new Date()));
}

export const sessionCount = createSessionCount();
