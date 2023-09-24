import { goto } from "$app/navigation";
import { removePendingMessage, addMessage, getMessageFromPendingMessages } from "$lib/stores/chat";
import { user } from "$lib/stores/user";

const message_confirm = async (data: { res_id: string }) => {
    const message = getMessageFromPendingMessages(data.res_id);
    removePendingMessage(data.res_id);

    let username = '';
    const unsubscribe = user.subscribe((user) => username = user);

    if (!message) return goto("/swim?warn=Unexpected Error");
    addMessage({
        content: message,
        id: '',
        author: {
            username: username,
            id: '',
        },
    });

    unsubscribe();
};

export default message_confirm;

