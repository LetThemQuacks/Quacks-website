<script lang="ts">
    import QInput from '$lib/QInput.svelte';
    import QAlert from '$lib/QAlert.svelte';
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
        <QAlert color="orange" icon="ph:warning-fill">You are already logged in as {data?.username}</QAlert>
    {:else if redirect}
        <QAlert color="orange" icon="ph:warning-fill">You must be logged in before going to {redirect}</QAlert>
    {/if}
    
    {#if form?.error && error_visibile}
        <QAlert color="red" icon="ph:warning-circle-fill">{form?.error}</QAlert>
    {/if} 
    
    <div class="mb-2 flex flex-row justify-between">
        <h1 class="font-extrabold text-white text-4xl sm:text-5xl">New <span class="text-yellow">Duck</span>!</h1>
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
