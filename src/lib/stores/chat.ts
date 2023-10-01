import { writable } from "svelte/store";

export interface User {
    id: string;
    username: string;
}
interface UserEvent {
    type: 'join' | 'leave';
    data: User;
    id?: number;
}

export interface MessageData {
    content: string;
    id: string;
    author: User;
}
interface MessageEvent {
    type: 'message';
    data: MessageData;
    id?: number;
}

export let chat = writable<Array<MessageEvent|UserEvent>>([]);

let id_counter = -1;
export const addEvent = (event: UserEvent | MessageEvent) => {
    id_counter += 1;
    event.id = id_counter;
    chat.update((c) => [event, ...c]);
}


interface PendingMessage {
    message: string;
    idx: number;
    req_id: string;
}
export let pending_messages = writable<PendingMessage[]>([]);
let pending_messages_value: PendingMessage[] = [];
pending_messages.subscribe((value) => pending_messages_value = value);

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
    chat.set([]);
    pending_messages.set([]);
}

