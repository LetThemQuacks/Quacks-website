import { goto } from "$app/navigation";
import { removePendingMessage, addMessage, getMessageFromPendingMessages } from "$lib/stores/chat";

const message_confirm = async (data: { res_id: string }) => {
    const message = getMessageFromPendingMessages(data.res_id);
    setTimeout(() => {
    removePendingMessage(data.res_id);

    if (!message) return goto("/swim?warn=Unexpected Error");
    addMessage({
        content: message,
        id: '',
        author: {
            username: '',
            id: '',
        },
    });
    }, 1000)
};

export default message_confirm;
