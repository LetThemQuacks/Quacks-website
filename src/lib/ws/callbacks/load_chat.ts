import { chat, type SystemEvent, type MessageEvent } from "$lib/stores/chat";

const load_chat = (data: { chat: (SystemEvent | MessageEvent)[] }) => {
    chat.update((c) => [...c, ...data.chat])
}

export default load_chat;

