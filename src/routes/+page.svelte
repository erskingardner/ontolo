<script lang="ts">
    import EventCard from "$lib/components/EventCard.svelte";
    import EventDebug from "$lib/components/EventDebug.svelte";
    import LabelForm from "$lib/components/LabelForm.svelte";
    import ndk from "$lib/stores/ndk";
    import type { NDKEvent, NDKFilter } from "@nostr-dev-kit/ndk";
    import { onMount, beforeUpdate } from "svelte";
    import { followsOnly } from "$lib/stores/followsOnly";
    import { currentUserFollows } from "$lib/stores/currentUser";

    let events: NDKEvent[] = [];
    let event: NDKEvent | undefined = undefined;

    let loadedFollowMode: boolean = false;

    onMount(async () => {
        await loadEvents();
    });

    beforeUpdate(async () => {
        if ($followsOnly && !loadedFollowMode) {
            await loadEvents();
        }

        if (!$followsOnly && loadedFollowMode) {
            await loadEvents();
        }
    });
    async function skipForward() {
        if (events.length === 0) {
            await loadEvents();
        } else {
            event = events.pop();
        }
    }

    async function loadEvents() {
        const filter: NDKFilter = {
            kinds: [1],
            limit: 100,
            since: Math.floor((Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000),
        };
        // If we're in follows mode, add authors filter
        if ($followsOnly) {
            filter.authors = $currentUserFollows;
            loadedFollowMode = true;
        } else {
            loadedFollowMode = false;
        }

        // Fetch events
        const eventSet = await $ndk.fetchEvents(filter);

        // Filter out reposts and quotes
        events = [...eventSet]
            .filter((e) => !e.tags.map((t) => t[0]).includes("e"))
            .filter((e) => !e.tags.map((t) => t[0]).includes("q"));

        event = events.pop();
    }
</script>

<div class="eventContainer px-4 lg:px-0 flex flex-col lg:flex-row lg:justify-between lg:gap-6">
    {#if event}
        <EventCard {event} />
        <LabelForm {event} on:nextEvent={skipForward} />
        <!-- <EventDebug {event} /> -->
    {/if}
</div>
