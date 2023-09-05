import { error, type Handle } from "@sveltejs/kit";
import { start_mongo } from "$lib/db/mongo";
import { getUserData } from "$lib/db/accounts";
import jwt from "jsonwebtoken";
import { TOKEN_PEPPER_STR } from "$env/static/private";

start_mongo().then(async () => {
    console.log('[mongodb] Connected!');
}).catch((e) => {
    console.log('[mongodb] ERROR: ' + e)
});

export const handle: Handle = async ({ event, resolve }) => { 
    const token = event.cookies.get('session');
    if (!token) {
        event.locals.user = undefined;
        return await resolve(event);
    }
    
    try {
        const token_payload = jwt.verify(token, TOKEN_PEPPER_STR);
        if (!token_payload || typeof token_payload === 'string') throw error(500, { message: 'something went wrong (jwt internal error)' });
    
        const user = await getUserData(token_payload.user.username);
        if (!user) throw error(404, { message: 'session not found' });

        const { password, ...user_without_password } = user;
        event.locals.user = user_without_password;
    } catch (e: any) {
        if (e.toString().includes('jwt expired')) event.cookies.set('session', '', { maxAge: 0 });
    }

    return await resolve(event);
};

