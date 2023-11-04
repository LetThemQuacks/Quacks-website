import { addEvent, type MessageData } from "$lib/stores/chat";

const on_message = async (data: MessageData) => {
    addEvent({
        type: 'message',
        data: data,
    });
}

export default on_message;

