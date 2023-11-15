import { startOfWeek } from "$lib/utils/dates";
import { writable } from "svelte/store";

function createWeeklyCount() {
    const weeklyCount = writable<number>(0);

    function increment() {
        weeklyCount.update((n) => {
            const count = n + 1;
            writeToLocalStorage(count);
            return count;
        });
    }

    function decrement() {
        weeklyCount.update((n) => {
            const count = n - 1;
            writeToLocalStorage(count);
            return count;
        });
    }

    function reset() {
        weeklyCount.update(() => {
            const count = 0;
            writeToLocalStorage(count);
            return count;
        });
    }

    return {
        ...weeklyCount,
        increment,
        decrement,
        reset,
    };
}

function writeToLocalStorage(value: number) {
    localStorage.setItem("weeklyCount", JSON.stringify(value));
    localStorage.setItem("weeklyCountDate", JSON.stringify(startOfWeek()));
}

export const weeklyCount = createWeeklyCount();
