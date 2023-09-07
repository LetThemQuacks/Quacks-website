import { writable } from "svelte/store";

export let connection_state = writable<'Connecting' | 'Connected' | 'Failed to connect'>();
export let connecting_ip = writable<string>();

