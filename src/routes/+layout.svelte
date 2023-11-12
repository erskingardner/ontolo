<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import "../app.css";
    import ndk from "$lib/stores/ndk";
    import { currentUser } from "$lib/stores/currentUser";
    import { NDKNip07Signer } from "@nostr-dev-kit/ndk";
    import type { NDKUser } from "@nostr-dev-kit/ndk";
    import toast, { Toaster } from "svelte-french-toast";
    import type { LayoutServerData } from "./$types";

    export let data: LayoutServerData;

    if (data.cookie) {
        $currentUser = $ndk.getUser({ pubkey: data.cookie });
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

<div class="container prose prose-sm dark:prose-invert mb-4 overflow-hidden">
    <Header on:signin={signin} on:signout={signout} />
    <slot />
</div>
