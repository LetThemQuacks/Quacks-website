<script lang="ts">
    import "iconify-icon";

    export let label: string = '';
    export let value = '';
    export let placeholder = '';
    export let type: 'text' | 'password' = 'text'
    export let icon: string | undefined = undefined;
    export let regex: string | null = null;
    export let title: string = '';
    export let not_required: boolean = false;

    let input: HTMLInputElement;

    let password_visibility = false;    
    $: if (value.length <= 0 && password_visibility) type = 'password', password_visibility = false;

    const toggleVisibility = () => {
        password_visibility = !password_visibility;
        input.focus()
        return type === 'text' ? type = 'password' : type = 'text';
    };

    const resetInput = () => {
        value = '';
        input.focus();
    }
</script>

<div class="w-full flex flex-col mb-2 last:mb-0 relative">
    {#if label}
    <label
        for="input"
        class="ml-1 font-medium text-base text-yellow transition-colors duration-300"
    >
        { label }
    </label>
    {/if}
 
    <div class="relative">
        {#if icon}
        <p class="text-yellow cursor-base absolute top-0 left-0 bottom-0 text-xl py-3 px-3.5">
            <iconify-icon icon={icon} class="h-5" />
        </p>
        {/if}

        <input
            class="w-full h-12 bg-dark border-[3px] border-yellow outline-none rounded-lg shadow-lg pr-10 py-2 font-base text-lg text-white transition-colors duration-300"
            class:pl-10={icon}
            class:pl-3={!icon}

            bind:this={input}
            autocomplete="off" required={!not_required}
            id="input" name={label}
            {...{type}} {placeholder}
            pattern={regex}
            {title}
        
            bind:value
        />
         
        {#if (type === 'password' && value.length > 0) || (type === 'text' && password_visibility)}
        <button on:click={toggleVisibility} type="button" class="a-btn absolute top-0 right-0 bottom-0 text-xl py-3 px-3.5">
            <iconify-icon icon={type === 'password' ? 'ri:eye-fill' : 'ri:eye-off-fill'} class="h-5" />
        </button>
        {/if}

        {#if type === 'text' && value.length > 0 && !password_visibility}
        <button on:click={resetInput} type="button" tabindex="-1" class="a-btn absolute top-0 right-0 bottom-0 text-xl py-3 px-3.5">
            <iconify-icon icon="heroicons:x-mark-20-solid" class="h-5" />
        </button>
        {/if}
    </div>
</div>
