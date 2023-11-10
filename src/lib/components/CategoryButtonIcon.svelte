<script lang="ts">
    import {
        CircleDollarSign,
        Cpu,
        Clapperboard,
        HeartPulse,
        Utensils,
        MapPinned,
        FastForward,
        Beef,
        BookMarked,
        Library,
        Bitcoin,
        Syringe,
        Sparkles,
        Trash2,
        Globe2,
        Laugh,
        Music,
        Tv,
        Image,
        LineChart,
        Wallet,
        Newspaper,
        Medal,
    } from "lucide-svelte";

    export let icon: string;
</script>

{#if icon === "circle-dollar-sign"}
    <CircleDollarSign />
{:else if icon === "cpu"}
    <Cpu />
{:else if icon === "clapperboard"}
    <Clapperboard />
{:else if icon === "heart-pulse"}
    <HeartPulse />
{:else if icon === "utensils"}
    <Utensils />
{:else if icon === "map-pinned"}
    <MapPinned />
{:else if icon === "fast-forward"}
    <FastForward />
{:else if icon === "library"}
    <Library />
{:else if icon === "bitcoin"}
    <Bitcoin />
{:else if icon === "syringe"}
    <Syringe />
{:else if icon === "sparkles"}
    <Sparkles />
{:else if icon === "trash-2"}
    <Trash2 />
{:else if icon === "globe-2"}
    <Globe2 />
{:else if icon === "laugh"}
    <Laugh />
{:else if icon === "music"}
    <Music />
{:else if icon === "tv"}
    <Tv />
{:else if icon === "medal"}
    <Medal />
{:else if icon === "beef"}
    <Beef />
{:else if icon === "book-marked"}
    <BookMarked />
{:else if icon === "image"}
    <Image />
{:else if icon === "line-chart"}
    <LineChart />
{:else if icon === "wallet"}
    <Wallet />
{:else if icon === "newspaper"}
    <Newspaper />
{:else}
    <!-- Do nothing -->
{/if}
