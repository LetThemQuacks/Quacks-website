<script lang="ts">
export let label: string;
export let value: boolean;
</script>

<div class="flex flex-col mb-2">
    <label
        for="input"
        class="ml-1 font-medium text-base text-yellow transition-colors duration-300"
    >
        { label }
    </label>
    <div class="flex flex-row min-w-[9rem] w-full h-12 mt-1">
        <button type="button" 
            class="rounded-l-lg border-yellow border-[3px] hover:bg-yellow w-[50%] font-semibold transition-all duration-300 outline-none"
            class:bg-dark={value}
            class:bg-yellow={!value}
            class:text-white={value}
            class:text-dark={!value}
            class:hover:bg-opacity-20={value}
            on:click={() => value = false}>Off</button>
        <button type="button" 
            class="rounded-r-lg border-yellow border-[3px] hover:bg-yellow w-[50%] font-semibold transition-all duration-300 outline-none"
            class:bg-dark={!value}
            class:bg-yellow={value}
            class:text-white={!value}
            class:text-dark={value}
            class:hover:bg-opacity-20={!value}
            on:click={() => value = true}>On</button>
    </div>
</div>

