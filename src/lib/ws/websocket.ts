import type AES_Cipher from "./crypto/aes"; 
import RSA_Cipher from "./crypto/rsa";
import CallbacksManager from "./callbacks_manager";

import server_aes from "./callbacks/server_aes";
import error from "./callbacks/error";

type Error_Handlers = {
    [from_packet_type: string]: CallableFunction,
};
interface Packet {
    type: string,
    data: any,
}

class WS_Client {
    static instance: WS_Client;

    ip: string;
    ws: WebSocket;
    AES_instance: AES_Cipher | null = null;
    RSA_instance: RSA_Cipher | null = null;
    error_handlers: Error_Handlers = {};

    constructor(ip: string) {
        if (WS_Client.instance) throw Error('A WS_Client instance already exist.');
        WS_Client.instance = this;
 
        this.ip = ip;
        this.ws = new WebSocket(this.ip); 
        this.connect();
        this.register_callbacks();
    }

    private connect() {
        this.ws.onopen = this.onConnect;
        this.ws.onmessage = this.onMessage;
        this.ws.onerror = this.onError;
        this.ws.onclose = this.onClose;
    }

    async setupCrypto() {
        this.RSA_instance = new RSA_Cipher();
        const { public_key } = await this.RSA_instance.generateKeys(2048);
        this.sendPacket({ type: 'client_rsa', data: { rsa_key: public_key }});
    }

    private register_callbacks() {
        CallbacksManager.register_callback('error', error);
        CallbacksManager.register_callback('server_aes', server_aes);
    }

    async dumpPacket(data: Object) {
        let data_str = JSON.stringify(data);
        if (this.AES_instance) data_str = await this.AES_instance.encrypt(data_str);
        return data_str;
    }

    async loadPacket(data: string) {
        if (this.AES_instance) data = await this.AES_instance.decrypt(data);
        return JSON.parse(data);
    }

    async sendPacket(data: Packet, error_handler: CallableFunction | undefined = undefined) {
        this.ws.send(await this.dumpPacket(data));
        if (error_handler) {
            this.error_handlers[data.type] = error_handler
        }
    }

    onConnect() {
        WS_Client.instance.setupCrypto();
    }

    async onMessage(message: MessageEvent<string>) {
        const data_obj = await WS_Client.instance!.loadPacket(message.data);

        const callback_obj = CallbacksManager.callbacks_dict[data_obj.type]
        callback_obj.callback(data_obj.data)
    }
    
    onError() {
    
    }

    onClose() {
        
    }
}

export default WS_Client;

