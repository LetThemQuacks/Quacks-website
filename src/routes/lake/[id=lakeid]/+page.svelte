<script lang="ts">
import { page } from "$app/stores";   
import { goto } from "$app/navigation";
import { onMount } from "svelte";

import WS_Client from "$lib/ws/websocket";


let lake_id: any;
$: lake_id = $page.params.id


onMount(async () => {
    if (!WS_Client.instance) new WS_Client('ws://localhost:5000/room');

    WS_Client.instance.ws.onclose = async () => { await goto('/swim') }
});

</script>

<svelte:head>
    <title>Lake #{lake_id} - Quacks</title>
</svelte:head>

<h1 class="font-medium text-white text-xl">Lake <span class="text-yellow">#{lake_id}</span></h1>
