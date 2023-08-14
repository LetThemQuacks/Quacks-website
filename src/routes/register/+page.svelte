<script lang="ts">
    import QInput from '$lib/QInput.svelte';
    import { enhance } from '$app/forms';
    import type { ActionData } from './$types';
    import type { PageData } from '../$types';
    import { page } from '$app/stores';
    
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
    <title>Register - Quacks</title>
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
    
    <div class="mb-2 flex flex-row justify-between">
        <h1 class="font-black text-white text-4xl sm:text-5xl">New <span class="text-yellow">Duck</span>!</h1>
    </div>

    <form method="POST" use:enhance>
        <QInput
            label="username"
            bind:value={username}
            placeholder="LorixDev"
            icon="ph:user-bold"
        />
        <QInput
            label="password"
            bind:value={password}
            type="password"
            placeholder="insert password"
            icon="mdi:lock"
        />
    
        {#if form?.error && error_visibile}
            <p class="text-red font-medium">
                Error: <span class="text-white">{ form?.error }</span>
            </p>
        {/if}

        <button class="btn w-full mt-4 group">Register</button>
        <h3 class="mt-2 mr-2 text-white font-base text-lg text-right">
            Already have a Duck?
            <a
                href={`/login${redirect ? `?redirect=${redirect}` : ''}`}
                class="a-btn"
            >
                Login!
            </a>
        </h3>
    </form>
</div>
