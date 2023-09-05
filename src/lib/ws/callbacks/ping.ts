import WS_Client from "../websocket";

const ping = async (_: any) => WS_Client.instance.sendPacket({ type: 'pong', data: {} });

export default ping;

