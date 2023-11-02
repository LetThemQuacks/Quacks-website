import { goto} from "$app/navigation";
import WS_Client from "../websocket";

const create_confirm = async (data: any) => {
    goto(`/lake/${data.id.toUpperCase()}${WS_Client.instance.ip !== WS_Client.default_ip ? `?ip=${WS_Client.instance.ip}` : ''}`);
}

export default create_confirm;

