<script>
    export let label;
    export let value = '';
    export let placeholder = '';
    export let error = false;
</script>

<div class="w-full flex flex-col mb-2 last:mb-0">
    {#if label}
    <label
        class="ml-1 font-semibold text-base transition-colors duration-300"
        class:text-yellow={!error}
        class:text-red={error}
    >
        { label }
    </label>
    {/if}

    <input
        class="w-full bg-dark border-[3px] outline-none rounded-lg shadow-lg px-3 py-2 font-medium text-white transition-colors duration-300"
        class:border-yellow={!error}
        class:border-red={error}

        type="text" bind:value {placeholder}
    />
</div>
