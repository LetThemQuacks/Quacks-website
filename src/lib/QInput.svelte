<script lang="ts">
    import "iconify-icon";

    export let label: string;
    export let value = '';
    export let placeholder = '';
    export let type: 'text' | 'password' = 'text'
    export let error = false;

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
        <input
            class="w-full h-12 bg-dark border-[3px] border-yellow outline-none rounded-lg shadow-lg px-3 py-2 font-base text-lg text-white transition-colors duration-300"
            class:pr-10={type === 'password' || password_visibility}
            
            autocomplete="off" required
            id="input" name={label}
            {...{type}} {placeholder}
        
            bind:value
        />
         
        {#if (type === 'password' && value.length > 0) || (type === 'text' && password_visibility)}
        <button on:click={toggleVisibility} type="button" class="absolute top-1 right-4 bottom-0 cursor-pointer hover:opacity-60 text-yellow text-lg">
            <iconify-icon height="none" icon={type === 'password' ? 'mdi:eye' : 'mdi:eye-off'} class="h-4" />
        </button>
        {/if}
    </div>
</div>
