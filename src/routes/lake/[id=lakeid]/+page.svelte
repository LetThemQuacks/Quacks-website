<script lang="ts">
import { page } from "$app/stores";   
import { onMount } from "svelte";

import { connectWs, connected } from "$lib/ws/websocket";
import RSA_Cipher from "$lib/ws/crypto/rsa";
import AES_Cipher from "$lib/ws/crypto/aes";


let lake_id: any;
$: lake_id = $page.params.id


onMount(async () => {
    const { ws, sendPacket } = connectWs();
    
    const RSA = new RSA_Cipher();
    const { private_key, public_key } = await RSA.generateKeys(2048);
    
    connected.subscribe((is_connected) => {
        if (is_connected) sendPacket({ type: 'client_rsa', data: { rsa_key: public_key, length: 2048 }});
    });
   
   ws.onmessage = async (message: MessageEvent) => {
        const data = JSON.parse(message.data).data;
        if (data.aes_key) {
            await RSA.importKey(private_key);
            const aes_key = await RSA.decrypt(data.aes_key);

            const AES = new AES_Cipher();
            await AES.importKey(aes_key);
            
            const aes_encrypt = await AES.encrypt('test');
            const aes_decrypt = await AES.decrypt(aes_encrypt);
            console.log(aes_decrypt)
        }
    }
});

</script>

<svelte:head>
    <title>Lake #{lake_id} - Quacks</title>
</svelte:head>

<h1 class="font-medium text-white text-xl">Lake <span class="text-yellow">#{lake_id}</span></h1>
