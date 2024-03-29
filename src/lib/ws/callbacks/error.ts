import WS_Client from "../websocket";
import { goto } from "$app/navigation";

const error = async (data: any) => {
    const client = WS_Client.instance;

    if (!Object.keys(client.error_handlers).includes(data.from_packet_type)) {
        console.warn(`Error not handled: ${JSON.stringify(data)}`);
        client.ws.close();
        await goto('/swim?warn=UNEXPECTED');
        return;
    }
    
    client.error_handlers[data.from_packet_type](data);
}

export default error;

