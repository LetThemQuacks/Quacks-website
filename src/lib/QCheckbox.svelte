<script lang="ts">
import "iconify-icon";
import { createEventDispatcher } from 'svelte';
	
const dispatch = createEventDispatcher();

export let text: string;
export let value: boolean;
export let disabled: boolean = false;

$: if (!value) dispatch('disabled');
</script>

<button
    on:click={() => value = !value}
    type="button"
    {disabled}
    class="flex flex-row items-center my-1 group cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
>
    <div
        class="aspect-square min-h-[1.75rem] border-yellow border-[3px] group-hover:bg-yellow group-hover:bg-opacity-60 rounded-lg
        shadow-lg transition-all duration-300"
        class:bg-yellow={value}
    >
        <iconify-icon icon="material-symbols:fitbit-check-small-rounded"
            class="text-2xl" class:opacity-0={!value} class:opacity-100={value} />
    </div>

    <p class="ml-2 font-medium text-lg text-white noselect">{text}</p>
</button>

