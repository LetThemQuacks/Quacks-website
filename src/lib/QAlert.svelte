<script lang="ts">
import { fade } from 'svelte/transition';
import 'iconify-icon';

export let color: 'red' | 'orange';
export let icon: string;
</script>

<div
    transition:fade={{ duration: 150 }} 
    class="relative flex flex-row items-center p-2 border-[3px] rounded-lg mb-4 shadow-lg"
    class:border-red={color === 'red'}
    class:border-orange={color === 'orange'}

    class:selection:bg-red={color === 'red'}
    class:selection:bg-orange={color === 'orange'}
>
    <iconify-icon icon={icon} class="absolute text-xl ml-1"
        class:text-red={color === 'red'}
        class:text-orange={color === 'orange'}
    />
    <p class="pl-9 w-full text-white font-medium"><slot /></p>
</div>

