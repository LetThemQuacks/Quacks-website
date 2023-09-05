import { writable } from "svelte/store";

export let messages = writable<string[]>([]);

export const add = (message: string) => messages.update((m) => [...m, message]);
export const reset = () => messages.set([]);

