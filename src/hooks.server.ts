import type { Handle } from "@sveltejs/kit";
import { generateToken, type UserData } from "$lib/security/tokens";
import { start_mongo } from "$lib/db/mongo";
import { PEPPER_STR } from "$env/static/private";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { accounts } from "$lib/db/accounts";
import { sequence } from "@sveltejs/kit/hooks";

start_mongo().then(async () => {
    console.log('[mongodb] Connected!');
}).catch((e) => {
    console.log('[mongodb] ERROR: ' + e)
});

      


export const handle: Handle = async ({ event, resolve }) => {
    return await resolve(event);
};
