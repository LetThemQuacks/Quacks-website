<script lang="ts">
import { page } from "$app/stores";   
import { onDestroy, onMount } from "svelte";
import { goto } from "$app/navigation";

import WS_Client from "$lib/ws/websocket";
import { add, messages, reset } from "./globals/chat";
    import { connection_state } from "../../swim/connection";

let lake_id: any;
$: lake_id = $page.params.id
$: ip = $page.url.searchParams.get('ip') ?? '';
$: if ($connection_state === 'Failed to connect') goto(`/swim?ip=${ip}`);

onMount(async () => {
    if (!WS_Client.instance) new WS_Client(ip ?? '');
    if (WS_Client.instance.ws.readyState === WebSocket.CLOSED) new WS_Client(ip ?? '', true);
    
    WS_Client.instance.sendPacket({
        type: 'join_room',
        data: {
            id: lake_id.toUpperCase().slice(0, 5),
        }
    }, (error: { from_packet_type: string, code: string }) => {
        if (error.code === 'NOT_FOUND') return goto('/swim?err=Oh no! Seems like you are trying to swim into an inexistent lake.');
    })

    add('reaching the lake...');
});

onDestroy(() => reset());

</script>

<svelte:head>
    <title>Lake #{lake_id} - Quacks</title>
</svelte:head>

<div class="flex flex-col items-center">
    {#each $messages as message}
        <p class="font-bold text-white">{message}</p>
    {/each}
    <button on:click={() => add('new Message?')} class="btn w-80 mt-4">new message</button>
    <button on:click={() => reset()} class="a-btn w-80 text-xl mt-4">reset</button>
    
    <h1 class="font-medium text-white text-xl">Lake <span class="text-yellow">#{lake_id}</span></h1>
</div>

