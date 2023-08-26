import { writable } from "svelte/store"

interface Packet {
    type: string,
    data: any,
}

export const connected = writable(false);

export const connectWs = (url: string = 'localhost:5000') => {
    let ws = new WebSocket(`ws://${url}/room`);
    
    ws.onopen = () => connected.set(true);
    //ws.onmessage = (message) => console.log(message);
    ws.onclose = () => connected.set(false);
    
    const sendPacket = (packet: Packet) => ws.send(JSON.stringify(packet));
    const closeWs = () => ws.close();

    return { sendPacket, closeWs, ws };
}

