import type { User } from "./chat";
import { writable } from "svelte/store";

export const users = writable<User[]>([]);
let users_value: User[] = [];
users.subscribe((value) => users_value = value);

export const addUser = (new_user: User) => users.update((u) => [new_user, ...u]);
export const removeUser = (user_id: string) => users.update((u) => u.filter((e) => e.id !== user_id));

export const resetUsers = () => users.set([]);
export const getUsernameFromId = (user_id: string) => users_value.find((u) => u.id === user_id)?.username;

