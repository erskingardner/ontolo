<script lang="ts">
    export let value: number;
    export let label: string;
</script>

<div class="flex flex-col gap-2 items-center p-2 border dark:border-gray-800 rounded-md">
    <h2 class="my-0 lg:text-4xl">{value}</h2>
    <span class="text-xs lg:text-lg">{label}</span>
</div>
