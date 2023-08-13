<script lang="ts">
    import QInput from '$lib/QInput.svelte';
    import { enhance } from '$app/forms';
    import 'iconify-icon';
    import type { ActionData } from './$types';
    import type { PageData } from '../$types';
        
    export let form: ActionData;
    export let data: PageData;
    
    let username = '';
    let password = '';
    let error_visibile = true;

    $: username, password, error_visibile = false;
    $: form?.error, error_visibile = true;
</script>

<svelte:head>
    <title>Login - Quacks</title>
</svelte:head>

<div>
    <div class="mb-2 flex flex-row items-center">
        <h1 class="font-semibold text-white text-4xl sm:text-5xl">Let's <span class="font-bold text-yellow">Login</span>!</h1>
    </div>

    <form class="w-80" method="POST" use:enhance>
        <QInput
            label="username"
            placeholder="LorixDev"
            icon="ph:user-bold"

            bind:value={username}
        />

        <QInput
            label="password"
            type="password"
            placeholder="Insert password"
            icon="mdi:lock"
            bind:value={password}
        />
        
        {#if form?.error && error_visibile}
            <p class="text-red font-medium">
                Error: <span class="text-white">{ form?.error }</span>
            </p>
        {/if}

        <button class="btn w-full mt-4">Login</button>
        <h3 class="mt-2 mr-2 text-white text-lg font-base text-right">
            Don't have a Duck?!
            <a
                href={`/register${data?.redirectTo}`}
                class="font-semibold text-yellow hover:text-white cursor-pointer transition-colors duration-300"
            >
                Create One!
            </a>
        </h3>
    </form>
</div>
