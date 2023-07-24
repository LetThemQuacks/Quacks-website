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
        <h3 class="font-bold text-2xl text-yellow text-center">Welcome back {username}!</h3>
        <a href="/logout" class="btn w-72 mt-12">Logout</a>
    </div>
{:else}
    <a href="/login" class="btn w-72 mt-4">Login</a>
{/if}
