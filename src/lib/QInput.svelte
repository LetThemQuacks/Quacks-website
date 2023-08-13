<script lang="ts">
    import "iconify-icon";

    export let label: string;
    export let value = '';
    export let placeholder = '';
    export let type: 'text' | 'password' = 'text'
    export let error = false;
    export let icon = 'mdi:duck';

    let password_visibility = false;    
    $: if (value.length <= 0 && password_visibility) type = 'password', password_visibility = false;

    const toggleVisibility = () => {
        password_visibility = !password_visibility;
        return type === 'text' ? type = 'password' : type = 'text';
    };
</script>

<div class="w-full flex flex-col mb-2 last:mb-0 relative">
    {#if label}
    <label
        for="input"
        class="ml-1 font-medium text-base transition-colors duration-300"
        class:text-yellow={!error}
        class:text-red={error}
    >
        { label }
    </label>
    {/if}
 
    <div class="relative"> 
        <p class="cursor-base absolute top-0 left-0 bottom-0 text-xl py-3 px-3.5" class:text-yellow={!error} class:text-red={error}>
            <iconify-icon icon={icon} class="h-5" />
        </p>

        <input
            class="w-full h-12 bg-dark border-[3px] outline-none rounded-lg shadow-lg pl-10 px-3 py-2 font-base text-lg text-white transition-colors duration-300"
            class:pr-10={type === 'password' || password_visibility}
            class:border-yellow={!error}
            class:border-red={error}
            
            autocomplete="off" required
            id="input" name={label}
            {...{type}} {placeholder}
        
            bind:value
        />
         
        {#if (type === 'password' && value.length > 0) || (type === 'text' && password_visibility)}
        <button on:click={toggleVisibility} type="button" class="a-btn absolute top-0 right-0 bottom-0 text-xl py-3 px-3.5">
            <iconify-icon icon={type === 'password' ? 'ri:eye-fill' : 'ri:eye-off-fill'} class="h-5" />
        </button>
        {/if}

        {#if type === 'text' && value.length > 0 && !password_visibility}
        <button on:click={() => value = ''} type="button" class="a-btn absolute top-0 right-0 bottom-0 text-xl py-3 px-3.5">
            <iconify-icon icon="heroicons:x-mark-20-solid" class="h-5" />
        </button>
        {/if}
    </div>
</div>
