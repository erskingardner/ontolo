import { writable } from "svelte/store";

export const followsOnly = writable<boolean>(false);
