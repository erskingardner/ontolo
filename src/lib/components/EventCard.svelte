<script lang="ts">
    import type { NDKEvent } from "@nostr-dev-kit/ndk";
    import { Name, Avatar, EventContent } from "@nostr-dev-kit/ndk-svelte-components";
    import ndk from "$lib/stores/ndk";
    import { timeAgo } from "$lib/utils/dates";

    export let event: NDKEvent;
</script>

<div
    class="event z-20 relative bg-gray-50 dark:bg-gray-950 border border-gray-500/50 rounded-md my-4 p-4 max-h-[40vh] lg:max-h-none lg:w-2/3 overflow-y-scroll"
>
    {#key event.id}
        <div class="author flex items-center gap-4">
            <Avatar
                ndk={$ndk}
                pubkey={event.pubkey}
                class="w-14 h-14 object-cover rounded-full border border-white my-0"
            />
            <span class="flex flex-col gap-0">
                <Name
                    ndk={$ndk}
                    pubkey={event.pubkey}
                    npubMaxLength={9}
                    class="text-lg font-semibold"
                />
                <span>{timeAgo(event.created_at)}</span>
            </span>
        </div>
        <EventContent ndk={$ndk} {event} />
    {/key}
</div>
