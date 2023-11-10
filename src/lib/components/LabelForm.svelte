<script lang="ts">
    import type { NDKEvent } from "@nostr-dev-kit/ndk";
    import { categories } from "$lib/constants/categories";
    import {
        CircleDollarSign,
        Cpu,
        Clapperboard,
        HeartPulse,
        Utensils,
        MapPinned,
    } from "lucide-svelte";
    export let event: NDKEvent;

    let selectedCategory: App.Category;

    $: console.log(selectedCategory);
</script>

<div class="flex flex-col gap-2 mb-10">
    {#each categories as category}
        <button
            on:click|preventDefault={() => (selectedCategory = category)}
            class="dark:bg-gray-600 {selectedCategory?.name === category.name
                ? 'dark:bg-gray-300 dark:text-black'
                : ''} dark:text-white p-2 px-4 rounded-md text-lg flex gap-2 items-center"
        >
            {#if category.icon === "circle-dollar-sign"}
                <CircleDollarSign />
            {:else if category.icon === "cpu"}
                <Cpu />
            {:else if category.icon === "clapperboard"}
                <Clapperboard />
            {:else if category.icon === "heart-pulse"}
                <HeartPulse />
            {:else if category.icon === "utensils"}
                <Utensils />
            {:else if category.icon === "map-pinned"}
                <MapPinned />
            {:else}
                <!-- Do nothing -->
            {/if}
            {category.name}
        </button>
    {/each}
</div>
