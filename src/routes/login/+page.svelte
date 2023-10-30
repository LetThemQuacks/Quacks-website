<script lang="ts">
    import QInput from '$lib/QInput.svelte';
    import QAlert from '$lib/QAlert.svelte';
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
        <QAlert color="orange" icon="ph:warning-fill">You are already logged in as {data?.username}</QAlert>
    {:else if redirect}
        <QAlert color="orange" icon="ph:warning-fill">You must be logged in before going to {redirect}</QAlert>
    {/if}
    
    {#if form?.error && error_visibile}
        <QAlert color="red" icon="ph:warning-circle-fill">{form?.error}</QAlert>
    {/if} 
    
    <div class="mb-2 flex flex-row items-center">
        <h1 class="font-extrabold text-white text-5xl">Let's <span class="text-yellow">Login</span>!</h1>
    </div>
    

    <form method="POST" use:enhance>
        <QInput
            label="Username"
            placeholder="LorixDev"
            icon="ph:user-bold"

            bind:value={username}
        />

        <QInput
            label="Password"
            type="password"
            placeholder="Insert password"
            icon="mdi:lock"

            bind:value={password}
        />
        
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
