<script lang="ts">
import "iconify-icon";

export let label: string;
export let value: number;

let interval: any;
const remove = () => { if (value > 2) value -= 1 };
const add = () => { if (value < 99) value += 1 };

$: if (value <= 2 || value >= 99) clearInterval(interval);
</script>

<div class="flex flex-col">
    <label
        for="input"
        class="ml-1 font-medium text-base text-yellow transition-colors duration-300"
    >
        { label }
    </label>
    <div class="flex flex-row w-full h-12 mt-1">
        <button type="button" class="btn aspect-square h-12" disabled={value <= 2}
            on:click={remove}
            on:mousedown={() => { if (!interval) interval = setInterval(remove, 100) }}
            on:mouseup={() => (clearInterval(interval), interval = null)}
        >
            <iconify-icon icon="iconamoon:sign-minus-bold" class="text-2xl" />
        </button>
        
        <input
            type="number"
            bind:value={value}
            on:input={() => {
                if (!Number.isInteger(value) || value < 2) value = 2;
                if (value > 99) value = 99;
            }}
            class="text-center text-white outline-none px-1 max-w-[3rem] bg-dark border-[3px] border-yellow rounded-lg shadow-lg mx-2"
        >

        <button type="button" class="btn aspect-square h-12" disabled={value >= 99}
            on:click={add}
            on:mousedown={() => { if (!interval) interval = setInterval(add, 100)}}
            on:mouseup={() => (clearInterval(interval), interval = null)}
        >
            <iconify-icon icon="iconamoon:sign-plus-bold" class="text-2xl" />
        </button>
    </div>
</div>

