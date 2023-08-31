<script lang="ts">
import { page } from "$app/stores";   
import { onMount } from "svelte";
import { goto } from "$app/navigation";

import WS_Client from "$lib/ws/websocket";


let lake_id: any;
$: lake_id = $page.params.id


onMount(async () => {
    if (!WS_Client.instance) new WS_Client('ws://localhost:5000/room');
    if (WS_Client.instance.ws.readyState === WebSocket.CLOSED) new WS_Client('ws://localhost:5000/room', true)
    
    WS_Client.instance.sendPacket({
        type: 'join_room',
        data: {
            id: lake_id.slice(0, 5),
        }
    }, (error: { from_packet_type: string, code: string }) => {
        if (error.code === 'NOT_FOUND') {
            goto('/swim?err=Oh no! Seems like you are trying to swim into an inexistent lake.')
        } 
    })
});

</script>

<svelte:head>
    <title>Lake #{lake_id} - Quacks</title>
</svelte:head>

<h1 class="font-medium text-white text-xl">Lake <span class="text-yellow">#{lake_id}</span></h1>
