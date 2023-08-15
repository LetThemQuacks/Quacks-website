<script lang="ts">
    import QInput from '$lib/QInput.svelte';
    import { enhance } from '$app/forms';
    import 'iconify-icon';
    import { page } from '$app/stores';
    import type { PageData } from '../$types';
    import type { ActionData } from './$types';
    
    export let data: PageData;
    export let form: ActionData;
    
    let username = '';
    let password = '';
    let error_visibile = true;

    $: username, password, error_visibile = false;
    $: form?.error, error_visibile = true;
    
    let redirect: string;
    $: redirect = $page.url.searchParams.get("redirect") ?? '';
</script>

<svelte:head>
    <title>Login - Quacks</title>
</svelte:head>

<div class="w-80">
    {#if data?.username}
        <p class="text-orange font-medium mb-4">
            Warning: <span class="text-white">you are already logged in as {data?.username}</span>
        </p>
    {:else if redirect}
        <p class="text-orange font-medium mb-4">
            Warning: <span class="text-white">you must be logged in before going to {redirect}</span>
        </p>
    {/if}
    
    <div class="mb-2 flex flex-row items-center">
        <h1 class="font-extrabold text-white text-4xl sm:text-5xl">Let's <span class="text-yellow">Login</span>!</h1>
    </div>
    

    <form method="POST" use:enhance>
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
                href={`/register${redirect ? `?redirect=${redirect}` : ''}`}
                class="font-semibold text-yellow hover:text-white cursor-pointer transition-colors duration-300"
            >
                Create One!
            </a>
        </h3>
    </form>
</div>
