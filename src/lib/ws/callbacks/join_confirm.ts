import type { User, MessageEvent, SystemEvent } from "$lib/stores/chat";
import { users } from "$lib/stores/users";
import { chat } from "$lib/stores/chat";

const join_confirm = (data: { online: {[user_id: string]: User}, chat: (MessageEvent | SystemEvent)[] }) => {
    users.set(Object.values(data.online));
    if (data.chat) chat.set(data.chat);
}

export default join_confirm;

