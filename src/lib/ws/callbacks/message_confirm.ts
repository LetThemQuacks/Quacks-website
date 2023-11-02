import { goto } from "$app/navigation";
import { removePendingMessage, addEvent, getMessageFromPendingMessages } from "$lib/stores/chat";
import { user } from "$lib/stores/user";

const message_confirm = async (data: { res_id: string, color: string, action?: 'hide' }) => {
    const message = getMessageFromPendingMessages(data.res_id);
    removePendingMessage(data.res_id);

    let username = '';
    const unsubscribe = user.subscribe((user) => username = user);

    if (!message) return goto("/swim?warn=UNEXPECTED");
    
    if (data.action !== 'hide') addEvent({
        type: 'message',
        data: {
            content: message,
            id: '',
            author: {
                username: username,
                id: '',
                color: data.color,
            },
        }
    });

    unsubscribe();
};

export default message_confirm;

