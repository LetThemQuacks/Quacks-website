import type AES_Cipher from "./crypto/aes"; 
import RSA_Cipher from "./crypto/rsa";
import CallbacksManager from "./callbacks_manager";

import ping from "./callbacks/ping"
import server_aes from "./callbacks/server_aes";
import error from "./callbacks/error";
import join_room from "./callbacks/join_confirm";

type Error_Handlers = {
    [from_packet_type: string]: CallableFunction,
};
interface Packet {
    type: string,
    data: {
        [key: string]: any;
    },
};

interface PacketWithError {
    packet: Packet,
    error_handler: CallableFunction | undefined,
}

class WS_Client {
    static instance: WS_Client;

    ws: WebSocket;
    AES_instance: AES_Cipher | null = null;
    RSA_instance: RSA_Cipher | null = null;
    error_handlers: Error_Handlers = {};
    packets_queue: PacketWithError[] = [];

    constructor(ip: string, force: boolean = false) {
        if (WS_Client.instance && !force) throw Error('A WS_Client instance already exist.');
        WS_Client.instance = this;
        
        this.registerCallbacks();
        this.ws = this.connect(ip); 
    }
    
    connect(ip: string) {
        this.ws = new WebSocket(ip);
        this.connectWsFunctions();
        return this.ws;
    }

    private connectWsFunctions() {
        this.ws.onopen = this.onConnect;
        this.ws.onmessage = this.onMessage;
        this.ws.onclose = this.onClose;
    }

    async setupCrypto() {
        this.RSA_instance = new RSA_Cipher();
        const { public_key } = await this.RSA_instance.generateKeys(2048);
        this.sendPacket({ type: 'client_rsa', data: { rsa_key: public_key }}); 
    }

    private registerCallbacks() {
        CallbacksManager.registerCallback('ping', ping)
        CallbacksManager.registerCallback('error', error);
        CallbacksManager.registerCallback('server_aes', server_aes);
        CallbacksManager.registerCallback('join_confirm', join_room);
    }

    async dumpPacket(data: Packet) {
        let data_str = JSON.stringify(data);
        if (this.AES_instance) data_str = await this.AES_instance.encrypt(data_str);
        return data_str;
    }

    async loadPacket(data: string) {
        if (this.AES_instance) data = await this.AES_instance.decrypt(data);
        return JSON.parse(data);
    }

    addPacketToQueue(packet: Packet, error_handler: CallableFunction | undefined) {
        this.packets_queue.push({ packet: packet, error_handler: error_handler });
    }

    async sendPacket(packet: Packet, error_handler: CallableFunction | undefined = undefined) {
        if ((this.ws.readyState !== WebSocket.OPEN || !this.AES_instance) && packet.type !== 'client_rsa') {
            return this.addPacketToQueue(packet, error_handler);
        }

        this.ws.send(await this.dumpPacket(packet));
        if (error_handler) {
            this.error_handlers[packet.type] = error_handler
        }
    }

    sendPacketsInQueue() {
        WS_Client.instance.packets_queue.forEach(({ packet, error_handler }) => {
            WS_Client.instance.sendPacket(packet, error_handler);
        })
    }

    onConnect() {
        WS_Client.instance.setupCrypto();
    }

    async onMessage(message: MessageEvent<string>) {
        if (message.data === '{"type": "ping"}') return WS_Client.instance.sendPacket({ type: 'pong', data: {} });
        const data_obj = await WS_Client.instance!.loadPacket(message.data);        

        const callback_obj = CallbacksManager.callbacks_dict[data_obj.type];
        if (!callback_obj) return console.warn(`Callback not handled "${data_obj.type}"`)
        callback_obj.callback(data_obj.data);
    }

    onClose() {
    }
}

export default WS_Client;

