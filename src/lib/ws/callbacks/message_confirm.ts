import { goto } from "$app/navigation";
import { removePendingMessage, addEvent, getMessageFromPendingMessages, type User } from "$lib/stores/chat";
import { you } from "$lib/stores/you";

const message_confirm = async (data: { res_id: string, msg_id: string, username: string, color: string, action?: 'hide' }) => {
    const message = getMessageFromPendingMessages(data.res_id);
    removePendingMessage(data.res_id);

    let you_value: User = { id: '', username: '', color: '' };
    const unsubscribe = you.subscribe((you) => you_value = you);

    if (!message) return goto("/swim?warn=UNEXPECTED");
    
    if (data.action !== 'hide') addEvent({
        type: 'message',
        data: {
            content: message,
            id: data.msg_id,
            author: {
                id: you_value.id,
                username: data.username ?? you_value.username,
                color: data.color ?? you_value.color,
            },
        }
    });

    unsubscribe();
};

export default message_confirm;

