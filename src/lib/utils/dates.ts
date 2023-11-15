import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function unixTimeNowInSeconds() {
    return Math.floor(new Date().getTime() / 1000);
}

export function dateTomorrow() {
    return new Date(Date.now() + 3600 * 1000 * 24);
}

/**
 * Returns the start of the current week as a Date object.
 * The week starts on Sunday.
 *
 * @returns {Date} A Date object representing the start of the current week.
 * The time is set to 00:00:00.000.
 *
 * @example
 * ```typescript
 * const weekStart = startOfWeek();
 * console.log(weekStart); // Outputs: "2022-02-06T00:00:00.000Z"
 * ```
 */
export function startOfWeek(): Date {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    // If it's already Sunday, there's no need to adjust
    const diff = dayOfWeek === 0 ? now.getDate() : now.getDate() - dayOfWeek;

    const startOfWeek = new Date(now.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
}

export function formattedDate(unixTimestampInSeconds: number): string {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const date = new Date(unixTimestampInSeconds * 1000);
    return date.toLocaleDateString("en-US", options);
}

export function timeAgo(unixTimestampInSeconds: number | undefined): string {
    if (unixTimestampInSeconds === undefined) return "Unknown";
    return dayjs().to(dayjs.unix(unixTimestampInSeconds));
}
