import { writable } from "svelte/store";

export let connection_state = writable<'Connecting' | 'Connected' | 'Failed to connect'>();
export let connection_ip = writable<string>();
export let status_bar = writable<string>();

