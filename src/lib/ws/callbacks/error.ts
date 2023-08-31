import WS_Client from "../websocket";
import { goto } from "$app/navigation";

const error = async (data: any) => {
    const client = WS_Client.instance;

    if (!Object.keys(client.error_handlers).includes(data.from_packet_type)) {
        console.log(`[WARNING] Error not handled: ${JSON.stringify(data)}`);
        client.ws.close();
        await goto('/swim?warn=Unexpected Error');
        return;
    }
    
    client.error_handlers[data.from_packet_type](data);
}

export default error;

