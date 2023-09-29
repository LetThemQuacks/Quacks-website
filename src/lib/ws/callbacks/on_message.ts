import { addEvent, type MessageData } from "$lib/stores/chat";
import { base64ToUtf8 } from "../crypto/arraybuffers";

const on_message = async (data: MessageData) => {
    data.content = base64ToUtf8(data.content);
    addEvent({
        type: 'message',
        data: data,
    });
}

export default on_message;

