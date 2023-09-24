import { writable } from "svelte/store";

export interface MessageData {
    content: string;
    id: string;
    idx?: number;
    author: {
      id: string;
      username: string;
    };
}

export let messages = writable<MessageData[]>([]);

let id_counter = -1;
export const addMessage = (message: MessageData) => {
    id_counter += 1;
    message.idx = id_counter;
    messages.update((m) => [message, ...m]);
}

interface PendingMessage {
    message: string;
    idx: number;
    req_id: string;
}

export let pending_messages = writable<PendingMessage[]>([]);
let pending_messages_value: PendingMessage[] = [];
pending_messages.subscribe((value) => (pending_messages_value = value));

let pending_id_counter = -1;
export const addPendingMessage = (message: string, req_id: string) => {
    pending_id_counter += 1;
    const pending_message = {
        message: message,
        req_id: req_id,
        idx: pending_id_counter,
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

