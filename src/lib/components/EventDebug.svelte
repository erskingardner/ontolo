<script lang="ts">
    import type { NDKEvent } from "@nostr-dev-kit/ndk";
    export let event: NDKEvent;
</script>

<div class="debug bg-gray-200 dark:bg-gray-800">
    {#key event.id}
        <pre>{JSON.stringify(event.rawEvent(), null, 4)}</pre>
    {/key}
</div>
