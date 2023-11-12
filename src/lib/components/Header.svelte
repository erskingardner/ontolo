<script lang="ts">
    import ndk from "$lib/stores/ndk";
    import { currentUser } from "$lib/stores/currentUser";
    import UserProfileMenu from "./UserProfileMenu.svelte";
</script>

<div
    class="header flex justify-between items-center py-2 px-4 bg-gray-200 dark:bg-gray-800 rounded-b-md"
>
    <div class="logo"><h1 class="m-0">Ontolo</h1></div>
    <div class="menu flex items-center gap-4">
        <div class="stats flex flex-col gap-0">
            <span>12 this session</span>
            <span>135 this week</span>
        </div>
        <UserProfileMenu on:signin on:signout />
    </div>
</div>
