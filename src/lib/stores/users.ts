import type { User } from "./chat";
import { writable } from "svelte/store";

export const online_users = writable<{[user_id: string]: User}>({});
export const authors = writable<{[user_id: string]: User}>({});
let users_value: {[user_id: string]: User} = {};
online_users.subscribe((value) => users_value = value);

export const addUser = (new_user: User) => online_users.update((u) => { u[new_user.id] = new_user; return u });
export const removeUser = (user_id: string) => online_users.update((u) => { delete u[user_id]; return u });

export const resetUsers = () => { online_users.set({}); authors.set({}) };
export const getUsernameFromId = (user_id: string) => users_value[user_id].username;

