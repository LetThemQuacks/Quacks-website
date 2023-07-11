<script lang="ts">
    import QInput from '$lib/QInput.svelte';
    import type { ActionData } from './$types';
    
    export let form: ActionData;

    let username = '';
    let password = '';
</script>

<svelte:head>
    <title>Register - Quacks</title>
</svelte:head>

<div>
    <div class="mb-4 flex flex-row items-center">
        <h1 class="font-bold text-yellow text-4xl sm:text-5xl">Register!</h1>
    </div>

    <form class="w-80" method="POST">
        <QInput
            label="username"
            bind:value={username}
            placeholder="LorixDev"
        />
        <QInput
            label="password"
            bind:value={password}
            type="password"
            placeholder="insert password"
        />
    
        <button class="btn w-full mt-2g group">Register</button>
        <h3 class="mt-2 mr-2 text-white font-medium text-right">
            Already have a Duck?!
            <a
                href="/login"
                class="font-semibold hover:text-yellow cursor-pointer transition-colors duration-300"
            >
                Login!
            </a>
        </h3>
    </form>
</div>
