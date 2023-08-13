<script lang="ts">
    import QInput from '$lib/QInput.svelte';
    import { enhance } from '$app/forms';
    import type { ActionData } from './$types';
    import type { PageData } from '../$types';
    
    export let form: ActionData;
    export let data: PageData;

    let username = '';
    let password = '';
</script>

<svelte:head>
    <title>Register - Quacks</title>
</svelte:head>

<div>
    <div class="mb-2 flex flex-row justify-between">
        <h1 class="font-black text-white text-4xl sm:text-5xl">New <span class="text-yellow">Duck</span>!</h1>
    </div>

    <form class="w-80" method="POST" use:enhance>
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
    
        {#if form?.error}
            <p class="text-red font-medium">
                { form?.error }
            </p>
        {/if}

        <button class="btn w-full mt-4 group">Register</button>
        <h3 class="mt-2 mr-2 text-white font-base text-lg text-right">
            Already have a Duck?
            <a
                href={`/login${data?.redirectTo}`}
                class="a-btn"
            >
                Login!
            </a>
        </h3>
    </form>
</div>
