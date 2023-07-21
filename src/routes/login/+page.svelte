<script lang="ts">
    import QInput from '$lib/QInput.svelte';
    import { enhance } from '$app/forms';
    // import type { ActionData } from './$types';
    
    // export let form: ActionData;
    
    let username = '';
    let password = ''; 
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
            bind:value={username}
            placeholder="LorixDev"
        />
        <QInput
            label="password"
            bind:value={password}
            type="password"
            placeholder="Insert password"
        />
    
        <button class="btn w-full mt-4">Login</button>
        <h3 class="mt-2 mr-2 text-white text-lg font-base text-right">
            Don't have a Duck?!
            <a
                href="/register"
                class="font-semibold text-yellow hover:text-white cursor-pointer transition-colors duration-300"
            >
                Create One!
            </a>
        </h3>
    </form>
</div>
