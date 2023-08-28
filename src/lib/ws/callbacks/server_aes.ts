import WS_Client from "../websocket";
import AES_Cipher from "../crypto/aes";
import { arrayBufferToBase64 } from "../crypto/arraybuffers";

interface Server_AES_Packet {
    aes_key: string;
}

const server_aes = async (data: Server_AES_Packet) => {
    const client = WS_Client.instance;

    const aes_key = await client.RSA_instance!.decrypt(data.aes_key);
    client.AES_instance = new AES_Cipher();
    client.AES_instance.importKey(aes_key);
    
    const said_res = await fetch('/api/said/new', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            aes: arrayBufferToBase64(aes_key),
            rsa: client.RSA_instance!.exported_public_key,
        }),
    });
    const said_data = await said_res.json();
    
    if (!said_data.ok) throw Error(said_data.msg);
    client.sendPacket({
        type: "said",
        data: {
            said: said_data.said,
        }
    })
}

export default server_aes;

