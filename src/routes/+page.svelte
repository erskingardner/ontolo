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

<svelte:head>
    <title>Ontolo</title>
    <meta name="description" content="Ontolo is a fun tool to label Nostr events." />

    <!-- Facebook Meta Tags -->
    <meta property="og:url" content="https://www.ontolo.social" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Ontolo" />
    <meta property="og:description" content="Ontolo is a fun tool to label Nostr events." />
    <meta property="og:image" content="https://i.nostr.build/neVn.webp" />

    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content="www.ontolo.social" />
    <meta property="twitter:url" content="https://www.ontolo.social" />
    <meta name="twitter:title" content="Ontolo" />
    <meta name="twitter:description" content="Ontolo is a fun tool to label Nostr events." />
    <meta name="twitter:image" content="https://i.nostr.build/neVn.webp" />
</svelte:head>

<div class="eventContainer px-4 lg:px-0 flex flex-col lg:flex-row lg:justify-between lg:gap-6">
    {#if event}
        <EventCard {event} />
        <LabelForm {event} on:nextEvent={skipForward} />
        <!-- <EventDebug {event} /> -->
    {/if}
</div>
