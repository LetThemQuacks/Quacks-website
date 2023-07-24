import type { Handle } from "@sveltejs/kit";
import type { UserData } from "$lib/security/tokens";
import { start_mongo } from "$lib/db/mongo";
import { PEPPER_STR } from "$env/static/private";
import jwt from "jsonwebtoken";
import { accounts } from "$lib/db/accounts";

start_mongo().then(async () => {
    console.log('[mongodb] Connected!');
}).catch((e) => {
    console.log('[mongodb] ERROR: ' + e)
});

export const handle: Handle = async ({ event, resolve }) => {
    const session_token = event.cookies.get('session') ?? '';
    
    try {
        if (!session_token) event.locals.user = undefined;
        
        const jwt_payload = jwt.verify(session_token, PEPPER_STR) as { user: UserData }; 
        if (!jwt_payload) event.locals.user = undefined;

        const user: UserData | null = await accounts.findOne<UserData>({ username: jwt_payload.user.username });
        if (session_token && jwt_payload && user) {
            const { password, ...user_without_pwd } = user;
            event.locals.user = user_without_pwd;
        }
    } finally {
        return await resolve(event);
    }
}

