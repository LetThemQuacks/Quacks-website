<script lang="ts">
    import QInput from '$lib/QInput.svelte';
    import type { ActionData } from './$types';
    
    export let form: ActionData;
    $: console.log(form)

    let username = '';
    let password = '';
    
    let placeholder = 'insert password';
</script>

<div>
    <h1 class="mb-4 font-bold text-yellow text-4xl sm:text-5xl">QUACKS!</h1>
    
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
            {placeholder}
        />
    


        <button class="btn w-full mt-2">Login</button>
    </form>
</div>
