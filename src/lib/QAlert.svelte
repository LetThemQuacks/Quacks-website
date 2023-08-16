<script lang="ts">
import { fade } from 'svelte/transition';
import 'iconify-icon';

export let color: 'red' | 'orange';
export let icon: string;

</script>

<div transition:fade={{ duration: 150 }} class={`flex flex-row items-center p-2 border-[3px] rounded-lg mb-4 shadow-lg`}
    class:border-red={color === 'red'}
    class:border-orange={color === 'orange'}
>
    <iconify-icon icon={icon} class={`text-${color} text-xl ml-1 mr-3`} />
    <p class="text-white font-medium"><slot /></p>
</div>
