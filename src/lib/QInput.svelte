<script lang="ts">
    import "iconify-icon";

    export let label;
    export let value = '';
    export let placeholder = '';
    export let type: 'text' | 'password' = 'text'
    export let error = false;

    let passwordVisible = false;
    const toggleType = () => {
        passwordVisible = !passwordVisible;
        return type === 'text' ? type = 'password' : type = 'text';
    };
</script>

<div class="w-full flex flex-col mb-2 last:mb-0 relative">
    {#if label}
    <label
        class="ml-1 font-semibold text-base transition-colors duration-300"
        class:text-yellow={!error}
        class:text-red={error}
    >
        { label }
    </label>
    {/if}
 
    <div class="relative">
        <input
            class="w-full h-12 bg-dark border-[3px] outline-none rounded-lg shadow-lg px-3 py-2 font-medium text-white transition-colors duration-300"
            class:border-yellow={!error}
            class:border-red={error}
            
            autocomplete="off"
            {...{type}} {placeholder}
        
            bind:value
        />
         
        {#if (type === 'password' && value.length > 0) || passwordVisible}
        <button on:click={toggleType} class="absolute top-1 right-4 bottom-0 cursor-pointer hover:opacity-60 text-yellow text-lg">
            <iconify-icon height="none" icon={type === 'password' ? 'mdi:eye' : 'mdi:eye-off'} class="h-4" />
        </button>
        {/if}
    </div>
</div>
