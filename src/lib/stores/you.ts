import { writable } from "svelte/store";
import type { User } from "./chat";

export let you = writable<User>();

