<script lang="ts">
import type { PageData } from "./$types";

export let data: PageData;

$: logged = data?.logged;
$: username = data?.username;
</script>

<svelte:head>
    <title>Quacks</title>
</svelte:head>

{#if logged}
    <div>
        <h3 class="font-bold text-4xl text-white text-center">Hi, <span class="text-yellow">{username}</span></h3>
        <a href="/swim" class="btn w-72 mt-8">Let's Swim</a>
        <a href="/logout" class="mt-4 a-btn w-full text-center text-lg font-bold text-white hover:text-red focus:text-red">Logout</a>
    </div>
{:else}
    <a href="/login" class="btn w-72 mt-4">Login</a>
{/if}
