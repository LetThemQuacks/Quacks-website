<script lang="ts">
import QInput from "$lib/QInput.svelte";
import QAlert from "$lib/QAlert.svelte";
import { enhance } from "$app/forms";
import { page } from "$app/stores";

$: warning = $page.url.searchParams.get('warn') ?? '';
$: error = $page.url.searchParams.get('err') ?? '';

</script>

<svelte:head>
    <title>Swim - Quacks</title>
</svelte:head>

<div class="w-80">
    {#if warning}
            <QAlert color="orange" icon="ph:warning-fill">{ warning }</QAlert>
    {/if}

    {#if error}
            <QAlert color="red" icon="ph:warning-circle-fill">{ error }</QAlert>
    {/if}


    <div class="mb-2 flex flex-row items-center">
        <h1 class="font-extrabold text-white text-4xl sm:text-5xl">Let's <span class="text-yellow">Swim</span>!</h1>
    </div>
    
    <a href="/create" class="btn w-full mt-6 mb-6">Create</a>
    
    <form method="POST" use:enhance>
        <QInput
            label="Lake ID"
            placeholder="XXXXXX"
            icon="ic:baseline-water-drop"
            regex="^[a-zA-Z0-9]&#123;6&#125;$"
            title="Lake ID of 6 characters"
        />

        <button class="btn w-full mt-4">Join</button>
    </form>
</div>
