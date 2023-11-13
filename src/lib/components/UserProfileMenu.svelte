<script lang="ts">
    import ndk from "$lib/stores/ndk";
    import { currentUser } from "$lib/stores/currentUser";
    import { scale } from "svelte/transition";
    import { expoInOut } from "svelte/easing";
    import { createEventDispatcher } from "svelte";
    import { Avatar, Name } from "@nostr-dev-kit/ndk-svelte-components";

    const dispatch = createEventDispatcher();

    let profileMenuVisible: boolean = false;

    function toggleProfileMenu() {
        profileMenuVisible = !profileMenuVisible;
    }
</script>

<!-- Profile dropdown -->
{#if $currentUser}
    <div class="relative">
        <button
            on:click={toggleProfileMenu}
            type="button"
            class="-m-1.5 flex gap-2 items-center p-1.5"
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
        >
            <span class="sr-only">Open user menu</span>
            <Avatar
                ndk={$ndk}
                pubkey={$currentUser.pubkey}
                class="w-12 h-12 my-0 rounded-full border-2 border-nostrOrange"
            />
            <Name
                ndk={$ndk}
                pubkey={$currentUser.pubkey}
                npubMaxLength={9}
                class="text-lg font-semibold"
            />
        </button>

        {#if profileMenuVisible}
            <!-- Dropdown profile menu -->
            <div
                on:pointerleave={toggleProfileMenu}
                in:scale={{ duration: 100, easing: expoInOut, start: 0.95 }}
                out:scale={{ duration: 75, easing: expoInOut, start: 0.95 }}
                class="absolute right-0 z-30 mt-2.5 w-32 origin-top-right rounded-md bg-white dark:bg-gray-800 dark:text-gray-50 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
            >
                <button
                    on:click={() => dispatch("signout")}
                    class="block w-full text-left px-3 py-1 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-1"
                >
                    Sign out
                </button>
            </div>
        {/if}
    </div>
{:else}
    <button
        on:click={() => dispatch("signin")}
        class="whitespace-nowrap rounded-md px-2 py-1 h-fit text-gray-50 bg-nostrOrange hover:bg-nostrOrange/80 hover:text-white"
    >
        Sign in
    </button>
{/if}
