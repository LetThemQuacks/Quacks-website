import WS_Client from "../websocket";

const error = async (data: any) => {
    const client = WS_Client.instance;

    if (!Object.keys(client.error_handlers).includes(data.from_packet_type)) {
        return console.log(`[WARNING] Error not handled: ${JSON.stringify(data)}`);
    }
    
    client.error_handlers[data.from_packet_type](data);
}

export default error;

