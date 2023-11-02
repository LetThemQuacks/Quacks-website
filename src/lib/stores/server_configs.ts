import { writable } from "svelte/store";

export interface Configs {
    room_creation?: {
        allow: boolean,
        force_ephemeral: boolean,
    }
}

export let configs = writable<Configs>({});

