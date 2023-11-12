import type { NDKUser } from "@nostr-dev-kit/ndk";
import { writable } from "svelte/store";

// The $currentUser store will be an NDKUser
export const currentUser = writable<NDKUser | null>(null);

// Store the user's current follower list as an array of hexpubkeys
export const currentUserFollows = writable<string[]>([]);
