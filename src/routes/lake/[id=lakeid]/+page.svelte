<script lang="ts">
import { page } from "$app/stores";   
import { onMount } from "svelte";

import { connectWs, connected } from "$lib/ws/websocket";
import { generateRsaKeys, importPrivateKey, decryptRsaBase64 } from "$lib/ws/crypto/rsa";
import { encryptAes, importAesKey } from "$lib/ws/crypto/aes";


let lake_id: any;
$: lake_id = $page.params.id

onMount(async () => {
    const { ws, sendPacket } = connectWs();
    
    const { exported_private_key, exported_public_key } = await generateRsaKeys(2048);
    
    connected.subscribe((is_connected) => {
        if (is_connected) sendPacket({ type: 'client_rsa', data: { rsa_key: exported_public_key, length: 2048 }});
    });
   
   ws.onmessage = async (message: MessageEvent) => {
        const data = JSON.parse(message.data).data;
        if (data.aes_key) {
            const private_key = await importPrivateKey(exported_private_key);
            const aes_key_bytes = await decryptRsaBase64(data.aes_key, private_key)
            const aes_key = await importAesKey(aes_key_bytes);
            
            console.log(await encryptAes('test', aes_key));
        }
    }
});

</script>

<svelte:head>
    <title>Lake #{lake_id} - Quacks</title>
</svelte:head>

<h1 class="font-medium text-white text-xl">Lake <span class="text-yellow">#{lake_id}</span></h1>
