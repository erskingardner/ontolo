<script lang="ts">
    import { currentUser, currentUserFollows } from "$lib/stores/currentUser";
    import { sessionCount } from "$lib/stores/sessionCount";
    import { weeklyCount } from "$lib/stores/weeklyCount";
    import UserProfileMenu from "./UserProfileMenu.svelte";
    import { followsOnly } from "$lib/stores/followsOnly";
</script>

<div class="header flex justify-between items-center py-2 px-4 bg-octoPurple rounded-b-md">
    <a href="/" class="logo no-underline flex flex-row gap-2 items-center">
        <img
            src="https://i.nostr.build/neVn.webp"
            alt="Ontolo logo"
            class="w-14 h-14 lg:w-16 lg:h-16 my-0"
        />
        <h1
            class="m-0 hidden lg:block text-transparent bg-clip-text bg-gradient-to-br from-octoTealLight to-octoTeal"
        >
            Ontolo
        </h1>
    </a>
    <div class="menu flex items-center gap-4">
        {#if $currentUser && $currentUserFollows.length > 0}
            <select
                bind:value={$followsOnly}
                class="bg-transparent text-sm py-0.5 no-underline text-gray-100 hover:text-gray-200"
            >
                <option value={false}>Universe</option>
                <option value={true}>Follows</option>
            </select>
        {/if}
        <div class="stats flex flex-col gap-0.5">
            <span class="text-gray-100">{$sessionCount} this session</span>
            <span class="text-gray-100">{$weeklyCount} this week</span>
        </div>
        <UserProfileMenu on:signin on:signout />
    </div>
</div>
