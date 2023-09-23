import { writable } from "svelte/store";

export interface MessageData {
    content: string;
    id: string;
    author: {
      id: string;
      username: string;
    };
}

export let messages = writable<MessageData[]>([]);
let messages_value: MessageData[] = [];
messages.subscribe((value) => messages_value = value);

export const addMessage = (message: MessageData) => {
    messages.update((m) => [message, ...m]);
}

interface PendingMessage {
    message: string;
    req_id: string;
}

export let pending_messages = writable<PendingMessage[]>([]);
let pending_messages_value: PendingMessage[] = [];
pending_messages.subscribe((value) => (pending_messages_value = value));

export const addPendingMessage = (message: string, req_id: string) => {
    const pending_message = {
        message: message,
        req_id: req_id,
    };
    pending_messages.update((m) => [pending_message, ...m]);
};
export const removePendingMessage = (res_id: string) => {
    pending_messages.update((m) => m.filter((e) => e.req_id !== res_id));
};
export const getMessageFromPendingMessages = (res_id: string) => {
    return pending_messages_value.find((m) => m.req_id === res_id)?.message;
};

export const resetChat = () => {
    messages.set([]);
    pending_messages.set([]);
}

