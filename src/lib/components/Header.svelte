<script lang="ts">
    import { sessionCount } from "$lib/stores/sessionCount";
    import UserProfileMenu from "./UserProfileMenu.svelte";
</script>

<div
    class="header flex justify-between items-center py-2 px-4 bg-gray-200 dark:bg-gray-800 rounded-b-md"
>
    <div class="logo"><h1 class="m-0">Ontolo</h1></div>
    <div class="menu flex items-center gap-4">
        <div class="stats flex flex-col gap-0">
            <span>{$sessionCount} this session</span>
        </div>
        <UserProfileMenu on:signin on:signout />
    </div>
</div>
