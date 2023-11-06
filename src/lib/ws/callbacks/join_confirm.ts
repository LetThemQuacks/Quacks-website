import type { User, MessageEvent, SystemEvent } from "$lib/stores/chat";
import { addUser, authors, online_users } from "$lib/stores/users";
import { chat } from "$lib/stores/chat";
import { you } from "$lib/stores/you";

interface JoinConfirmData {
    you: User;
    chat: (MessageEvent | SystemEvent)[];
    authors: {[user_id: string]: User};
    online: {[user_id: string]: User};
}

const join_confirm = (data: JoinConfirmData) => {
    online_users.set(data.online);
    authors.set(data.authors);
    you.set(data.you)
    
    addUser(data.you)
    
    if (data.chat) chat.set(data.chat);
}

export default join_confirm;

