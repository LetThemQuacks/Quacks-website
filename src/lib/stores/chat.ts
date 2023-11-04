import { utf8ToBase64 } from "$lib/ws/crypto/arraybuffers";
import { writable } from "svelte/store";

export interface User {
    id: string;
    username?: string;
    color?: string;
}
export interface MessageData {
    content: string;
    id: string;
    author: User;
}
export interface MessageEvent {
    type: 'message';
    data: MessageData;
}
export interface SystemData {
    content: string;
    color: string;
    id: string;
}
export interface SystemEvent {
    type: 'system';
    data: SystemData;
}

export let chat = writable<Array<MessageEvent|SystemEvent>>([]);

export const addEvent = (event: SystemEvent | MessageEvent) => chat.update((c) => [event, ...c]);

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
    return utf8ToBase64(pending_messages_value.find((m) => m.req_id === res_id)?.message ?? '');
};

export const resetChat = () => {
    chat.set([]);
    pending_messages.set([]);
}

