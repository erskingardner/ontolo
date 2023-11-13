<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import "../app.css";
    import ndk from "$lib/stores/ndk";
    import { currentUser } from "$lib/stores/currentUser";
    import { NDKNip07Signer } from "@nostr-dev-kit/ndk";
    import type { NDKUser } from "@nostr-dev-kit/ndk";
    import toast, { Toaster } from "svelte-french-toast";
    import type { LayoutServerData } from "./$types";
    import { sessionCount } from "$lib/stores/sessionCount";
    import { browser } from "$app/environment";

    export let data: LayoutServerData;

    if (data.cookie) {
        $currentUser = $ndk.getUser({ pubkey: data.cookie });
    }

    if (browser) {
        const storedSessionCount = localStorage.getItem("sessionCount");
        const storedSessionCountDate = localStorage.getItem("sessionCountDate");
        if (
            storedSessionCount &&
            storedSessionCountDate &&
            // Check if the time of the last label event is within 2 hours.
            Date.parse(storedSessionCountDate) > Date.now() - 2 * 60 * 60 * 1000
        ) {
            sessionCount.set(parseInt(storedSessionCount));
        }
    }

    async function signin() {
        const signer = new NDKNip07Signer();
        $ndk.signer = signer;
        signer
            .user()
            .then(async (ndkUser: NDKUser) => {
                $currentUser = ndkUser;
                document.cookie = `ontoloUserPubkey=${ndkUser.pubkey};
                    max-age=max-age-in-seconds=1209600; SameSite=Lax; Secure; path=/`;
                toast.success("Signed in");
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
    }
</script>

<Toaster />

<div class="container prose prose-sm lg:max-w-5xl dark:prose-invert mb-4 overflow-hidden">
    <Header on:signin={signin} on:signout={signout} />
    <slot />
</div>
