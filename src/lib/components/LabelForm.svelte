<script lang="ts">
    import type { NDKEvent } from "@nostr-dev-kit/ndk";
    import { categories } from "$lib/constants/categories";
    import { fly } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    import CategoryButtonIcon from "./CategoryButtonIcon.svelte";

    export let event: NDKEvent;

    let categoriesVisible: boolean = true;
    let subcategoriesVisible: boolean = false;

    let selectedCategory: App.Category | null = null;
    let selectedSubcategory: App.Category | null = null;

    function handleCategorySelect(category: App.Category) {
        selectedCategory = category;
        categoriesVisible = false;
        subcategoriesVisible = true;
    }

    function backToCategory() {
        selectedCategory = null;
        subcategoriesVisible = false;
        setTimeout(() => {
            categoriesVisible = true;
        }, 250);
    }

    $: console.log(selectedCategory);
</script>

<div class="breadcrumb my-8 h-4 flex gap-2 items-center">
    {#if selectedCategory}
        <button
            on:click={backToCategory}
            class="px-2 py-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-md dark:text-white"
            >Back</button
        >
        {`${selectedCategory.name} ->`}
    {/if}
</div>
<div class="relative">
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
                    on:touchend={() => handleCategorySelect(category)}
                    class="{selectedCategory?.name === category.name
                        ? 'bg-gray-700 text-gray-50 dark:bg-gray-300 dark:text-gray-950'
                        : 'bg-gray-300 dark:bg-gray-600'} dark:text-white p-2 px-4 rounded-md text-lg flex gap-2 items-center"
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
                    on:click|preventDefault={() => (selectedSubcategory = category)}
                    on:touchend|preventDefault={() => (selectedSubcategory = category)}
                    class="{selectedSubcategory?.name === category.name
                        ? 'bg-gray-700 text-gray-50 dark:bg-gray-300 dark:text-gray-950'
                        : 'bg-gray-300 dark:bg-gray-600 dark:text-white'} p-2 px-4 rounded-md text-lg flex gap-2 items-center"
                >
                    <CategoryButtonIcon icon={category.icon} />
                    {category.name}
                </button>
            {/each}
        </div>
    {/if}
</div>
