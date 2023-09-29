import { addEvent, type MessageData } from "$lib/stores/chat";

const on_message = async (data: MessageData) => {
    data.content = atob(data.content);
    addEvent({
        type: 'message',
        data: data,
    });
}

export default on_message;

