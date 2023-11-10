<script lang="ts">
    import EventCard from "$lib/components/EventCard.svelte";
    import EventDebug from "$lib/components/EventDebug.svelte";
    import LabelForm from "$lib/components/LabelForm.svelte";
    import ndk from "$lib/stores/ndk";
    import type { NDKEvent } from "@nostr-dev-kit/ndk";
    import { onMount } from "svelte";

    let events: Set<NDKEvent>;
    let event: NDKEvent | null = null;

    onMount(async () => {
        events = await $ndk.fetchEvents({
            kinds: [1],
            limit: 100,
            since: Math.floor((Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000),
        });
    });

    function randomEvent(arr: NDKEvent[]): NDKEvent {
        const filtered = arr
            .filter((e) => !e.tags.map((t) => t[0]).includes("e"))
            .filter((e) => !e.tags.map((t) => t[0]).includes("q"));
        return filtered[Math.floor(Math.random() * filtered.length)];
    }

    $: event = events ? randomEvent([...events]) : null;
</script>

<div class="eventContainer px-4 lg:px-0">
    {#if event}
        <EventCard {event} />
        <LabelForm {event} />
        <EventDebug {event} />
    {/if}
</div>
