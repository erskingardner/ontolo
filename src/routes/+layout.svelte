<script>
    import "../app.css";
</script>

<div class="container prose prose-sm dark:prose-invert mb-4 overflow-hidden">
    <div
        class="header flex justify-between items-center py-2 px-4 bg-gray-200 dark:bg-gray-800 rounded-b-md"
    >
        <div class="logo"><h1 class="m-0">Ontolo</h1></div>
        <div class="menu flex items-center gap-4">
            <div class="stats flex flex-col gap-0">
                <span>12 this session</span>
                <span>135 this week</span>
            </div>
            <img
                src="https://robohash.org/ontolo"
                alt="avatar"
                class="avatar h-10 w-10 rounded-full border border-gray-950 dark:border-gray-50 m-0"
            />
        </div>
    </div>
    <slot />
</div>
