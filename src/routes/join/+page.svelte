<script lang="ts">
import QInput from "$lib/QInput.svelte";
import { enhance } from "$app/forms";
</script>

<svelte:head>
    <title>Join - Quacks</title>
</svelte:head>

<div class="w-80">
    <div class="mb-2 flex flex-row items-center">
        <h1 class="font-extrabold text-white text-4xl sm:text-5xl">Let's <span class="text-yellow">Swim</span>!</h1>
    </div>
    
    <a class="btn w-full mt-6 mb-6">Create</a>
    
    <form method="POST" use:enhance>
        <QInput
            label="Lake ID"
            placeholder="XXXXXX"
            icon="ic:baseline-water-drop"
            regex='^[a-zA-Z0-9]&#123;6&#125;$'
        />

        <button class="btn w-full mt-4">Join</button>
    </form>
</div>
