<script lang="ts">
    import ndk from "$lib/stores/ndk";
    import type { NDKEvent, NDKSubscription } from "@nostr-dev-kit/ndk";
    import { onMount, beforeUpdate } from "svelte";
    import { Line } from "svelte-chartjs";
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale,
    } from "chart.js";
    import StatCard from "$lib/components/StatCard.svelte";

    // Register so we can tree-shake
    ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

    let labelSub: NDKSubscription;
    let labelEvents: Set<NDKEvent> = new Set();
    let labelCount: number = 0;
    let countsByDate: { [date: string]: number } = {};
    let countsByEvent: { [eventId: string]: number } = {};
    let countsByPubkey: { [pubkey: string]: number } = {};
    let data: Chart.ChartData = {};

    onMount(async () => {
        // Set up date window
        for (let i = 7; i >= 0; i--) {
            let date = new Date();
            date.setDate(date.getDate() - i);
            countsByDate[date.toISOString().split("T")[0]] = 0;
        }

        // Create a subscription, keep it open
        labelSub = $ndk.subscribe(
            {
                kinds: [1985],
                "#L": ["social.ontolo.categories"],
            },
            { closeOnEose: false },
            undefined,
            true
        );

        labelSub.on("event", (event: NDKEvent) => {
            labelEvents.add(event);
            labelCount += 1;
            let date: string = new Date(event.created_at! * 1000).toISOString().split("T")[0];
            countsByDate[date] += 1;
            const eTagId = event.getMatchingTags("e")[0][1];
            countsByEvent[eTagId] = (countsByEvent[eTagId] || 0) + 1;
            countsByPubkey[event.pubkey] = (countsByPubkey[event.pubkey] || 0) + 1;
        });
    });

    beforeUpdate(() => {
        data = {
            labels: Object.keys(countsByDate),
            datasets: [
                {
                    label: "Label events by date",
                    data: Object.values(countsByDate),
                    borderColor: "#3DA99E",
                },
            ],
        };
    });
</script>

<div class="p-4">
    <div class="grid grid-cols-3 justify-center gap-2 lg:gap-10 items-center my-6 lg:my-10">
        {#if labelEvents}
            <StatCard value={labelCount} label="Total labels created" />
            <StatCard value={Object.keys(countsByEvent).length} label="Unique events labeled" />
            <StatCard
                value={Object.keys(countsByPubkey).length}
                label="Unique npubs creating labels"
            />
        {/if}
    </div>

    <h2>Labels by date</h2>
    <Line bind:data options={{ responsive: true }} />
</div>
