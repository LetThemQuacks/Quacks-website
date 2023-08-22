<script lang="ts">
import { page } from "$app/stores";   
import { connectWs, connected } from "$lib/ws/websocket";
import { onMount } from "svelte";

let lake_id: any;
$: lake_id = $page.params.id

onMount(async () => {
    const { sendPacket } = connectWs();
    
    const { privateKey, publicKey } = await crypto.subtle.generateKey(
        {
            name: 'RSA-OAEP',
            modulusLength: 2560,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: 'SHA-256',
        },
        true,
        ['encrypt', 'decrypt']
    )
    console.log(await crypto.subtle.exportKey('pkcs8', publicKey))

    connected.subscribe((is_connected) => {
        if (is_connected) sendPacket({ type: 'client_rsa', data: { 'rsa_key': publicKey }});
    });
});

</script>

<svelte:head>
    <title>Lake #{lake_id} - Quacks</title>
</svelte:head>

<h1 class="font-medium text-white text-xl">Lake <span class="text-yellow">#{lake_id}</span></h1>
