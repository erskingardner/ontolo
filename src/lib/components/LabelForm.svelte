<script lang="ts">
    import { NDKEvent, NDKNip07Signer, type NDKTag } from "@nostr-dev-kit/ndk";
    import { categories } from "$lib/constants/categories";
    import { fly } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    import CategoryButtonIcon from "./CategoryButtonIcon.svelte";
    import toast from "svelte-french-toast";
    import { createEventDispatcher } from "svelte";
    import ndk from "$lib/stores/ndk";
    import { unixTimeNowInSeconds } from "$lib/utils/dates";
    import { currentUser } from "$lib/stores/currentUser";
    import { sessionCount } from "$lib/stores/sessionCount";

    const dispatch = createEventDispatcher();

    export let event: NDKEvent;

    let categoriesVisible: boolean = true;
    let subcategoriesVisible: boolean = false;

    let selectedCategory: App.Category | null = null;
    let selectedSubcategory: App.Category | null = null;

    function handleCategorySelect(category: App.Category) {
        if (!$currentUser) {
            toast("Please log in to label events");
            return;
        }
        if (category.name === "Skip") {
            selectedCategory = null;
            selectedSubcategory = null;
            dispatch("nextEvent");
        } else {
            selectedCategory = category;
            categoriesVisible = false;
            subcategoriesVisible = true;
        }
    }

    async function handleSubcategorySelect(category: App.Category) {
        selectedSubcategory = category;
        await publishLabelEvent();
    }

    async function publishLabelEvent() {
        if (!$currentUser) {
            toast("Please log in to label events");
            return;
        }
        if (!selectedCategory || !selectedSubcategory) {
            toast("Please select a category and subcategory");
            return;
        }

        const signer = new NDKNip07Signer();
        $ndk.signer = signer;
        const labelEvent = new NDKEvent($ndk, {
            created_at: unixTimeNowInSeconds(),
            pubkey: $currentUser.pubkey,
            content: "",
            kind: 1985,
            tags: [
                ["L", "social.ontolo.categories"],
                [
                    "l",
                    `${selectedCategory.name}/${selectedSubcategory.name}`,
                    "social.ontolo.categories",
                ],
                ["e", event.id],
            ],
        });

        labelEvent
            .publish()
            .then(() => {
                toast.success("Label published!");
                backToCategory();
                sessionCount.increment();
                dispatch("nextEvent");
            })
            .catch((error) => {
                toast.error(error.message);
                console.error(error);
            });
    }

    function backToCategory() {
        selectedCategory = null;
        selectedSubcategory = null;
        subcategoriesVisible = false;
        setTimeout(() => {
            categoriesVisible = true;
        }, 250);
    }
</script>

{#key event.id}
    <div class="relative my-4 z-10 lg:w-1/3">
        {#if selectedCategory}
            <div class="breadcrumb mb-4 flex gap-2 items-center">
                <button
                    on:click={backToCategory}
                    class="px-2 py-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-md dark:text-white"
                    >Back</button
                >
                {`${selectedCategory.name} ->`}
            </div>
        {/if}
        {#if categoriesVisible}
            <div
                id="categoryList"
                class="flex flex-col gap-2 mb-10"
                in:fly={{ duration: 200, delay: 0, x: "-100vw", easing: cubicInOut }}
                out:fly={{ duration: 200, delay: 0, x: "-100vw", easing: cubicInOut }}
            >
                {#each categories as category}
                    <button
                        on:click={() => handleCategorySelect(category)}
                        class="{selectedCategory?.name === category.name
                            ? 'bg-gray-700 text-gray-50 dark:bg-gray-300 dark:text-gray-950'
                            : 'bg-gray-300 dark:bg-gray-600'} dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500 p-2 px-4 rounded-md flex gap-2 items-center"
                    >
                        <CategoryButtonIcon icon={category.icon} />
                        {category.name}
                    </button>
                {/each}
            </div>
        {/if}

        {#if subcategoriesVisible && selectedCategory?.subcategories}
            <div
                id="subcategoryList"
                class="flex flex-col gap-2 mb-10"
                in:fly={{ duration: 200, delay: 250, x: "100vw", easing: cubicInOut }}
                out:fly={{ duration: 200, delay: 0, x: "100vw", easing: cubicInOut }}
            >
                {#each selectedCategory.subcategories as category}
                    <button
                        on:click={() => handleSubcategorySelect(category)}
                        class="{selectedSubcategory?.name === category.name
                            ? 'bg-gray-700 text-gray-50 dark:bg-gray-300 dark:text-gray-950'
                            : 'bg-gray-300 dark:bg-gray-600 dark:text-white'} p-2 px-4 rounded-md flex gap-2 items-center"
                    >
                        <CategoryButtonIcon icon={category.icon} />
                        {category.name}
                    </button>
                {/each}
            </div>
        {/if}
    </div>
{/key}
