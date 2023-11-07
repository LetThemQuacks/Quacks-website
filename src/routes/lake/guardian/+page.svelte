<script lang="ts">
import { page } from "$app/stores";
import { goto } from "$app/navigation";
import { lake_password } from "$lib/stores/lake_password";
import { getError } from "$lib/errors";

import QInput from "$lib/QInput.svelte";
import QAlert from "$lib/QAlert.svelte";


$: error = getError($page.url.searchParams.get('err') ?? '');
$: ip = $page.url.searchParams.get('ip') ?? '';
$: id = $page.url.searchParams.get('id') ?? '';
$: if (!id) goto(`/swim?err=GUARDIAN_ERROR${ip ? `&ip=${ip}` : ''}`);

const gotoLake = (id: string) => goto(`/lake/${id.toUpperCase()}${ip ? `?ip=${ip}` : ''}`);
</script>

<form on:submit|preventDefault={() => gotoLake(id)} class="w-80"> 
    {#if error}
        <QAlert color="red" icon="ph:warning-circle-fill">{ error }</QAlert>
    {/if}

    <h1 class="font-extrabold text-white text-5xl mb-4">Lake <span class="text-yellow">Guardian</span></h1>
    
    <QInput
        label="What's the secret word?"
        bind:value={$lake_password}
        type="password"
        placeholder="Qu**k Qu**k"
        icon="mdi:lock"
    />

    <button class="btn w-full mt-4">Continue</button> 
</form>

