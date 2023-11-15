<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import "../app.css";
    import ndk from "$lib/stores/ndk";
    import { currentUser, currentUserFollows } from "$lib/stores/currentUser";
    import { NDKNip07Signer } from "@nostr-dev-kit/ndk";
    import type { NDKUser } from "@nostr-dev-kit/ndk";
    import toast, { Toaster } from "svelte-french-toast";
    import type { LayoutServerData } from "./$types";
    import { sessionCount } from "$lib/stores/sessionCount";
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { followsOnly } from "$lib/stores/followsOnly";
    import { startOfWeek } from "$lib/utils/dates";
    import { weeklyCount } from "$lib/stores/weeklyCount";

    export let data: LayoutServerData;

    if (data.cookie) {
        $currentUser = $ndk.getUser({ pubkey: data.cookie });
        if ($currentUser && $currentUserFollows.length === 0) {
            fetchFollowers($currentUser);
        }
        if ($currentUserFollows.length > 0) {
            $followsOnly = true;
        }
    }

    if (browser) {
        const storedSessionCount = localStorage.getItem("sessionCount");
        const storedSessionCountDate = localStorage.getItem("sessionCountDate");
        const storedWeeklyCount = localStorage.getItem("weeklyCount");
        const storedWeeklyCountDate = localStorage.getItem("weeklyCountDate");

        if (
            storedSessionCount &&
            storedSessionCountDate &&
            // Check if the time of the last label event is within 2 hours.
            Date.parse(storedSessionCountDate) > Date.now() - 24 * 60 * 60 * 1000
        ) {
            sessionCount.set(parseInt(storedSessionCount));
        }

        if (
            storedWeeklyCount &&
            storedWeeklyCountDate &&
            new Date(Date.parse(storedWeeklyCountDate)) === startOfWeek()
        ) {
            weeklyCount.set(parseInt(storedWeeklyCount));
        }
    }

    async function signin() {
        const signer = new NDKNip07Signer();
        $ndk.signer = signer;
        signer
            .user()
            .then(async (ndkUser: NDKUser) => {
                $currentUser = ndkUser;
                await fetchFollowers(ndkUser);
                document.cookie = `ontoloUserPubkey=${ndkUser.pubkey};
                    max-age=max-age-in-seconds=1209600; SameSite=Lax; Secure; path=/`;
                toast.success("Signed in");
                $followsOnly = true;
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((error: any) => {
                console.error(error.message);
            });
    }

    function signout() {
        currentUser.set(null);
        document.cookie = "ontoloUserPubkey=";
        toast.success("Signed out");
        $followsOnly = false;
        goto("/");
    }

    async function fetchFollowers(ndkUser: NDKUser) {
        const follows = await ndkUser.follows();
        currentUserFollows.set([...follows].map((f) => f.pubkey));
    }
</script>

<Toaster />

<div class="container prose prose-sm lg:max-w-5xl dark:prose-invert mb-4 overflow-hidden">
    <Header on:signin={signin} on:signout={signout} />
    <slot />
</div>
