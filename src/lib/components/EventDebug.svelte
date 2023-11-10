<script lang="ts">
    import type { NDKEvent } from "@nostr-dev-kit/ndk";
    export let event: NDKEvent;
    let debugVisible: boolean = false;
</script>

<button
    class="debugButton bg-gray-200 dark:bg-gray-800 rounded-md py-1 px-2 text-gray-500 dark:text-gray-400"
    on:click={() => (debugVisible = !debugVisible)}
>
    Debug
</button>

{#if debugVisible}
    <div class="debug bg-gray-200 dark:bg-gray-800">
        <pre>{JSON.stringify(event.rawEvent(), null, 4)}</pre>
    </div>
{/if}
