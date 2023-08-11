import type { Actions } from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";

import type { UserData } from "$lib/security/tokens";
import { generateToken } from "$lib/security/tokens";
import { getUserData } from "$lib/db/accounts";
import { verifyPassword } from "$lib/security/auth";


export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData(); 
        const data = Object.fromEntries(formData.entries());
        
        const username = data.username.toString();

        const user: UserData | null = await getUserData(username);
        if (!user) return fail(404, { error: 'Wrong username or password', username: username });
        
        const success = verifyPassword(data.password.toString(), user.password!);
        if (!success) return fail(404, { error: 'Wrong username or password', username: username });
        
        const { password, ...token_payload } = user;
        const token = generateToken(token_payload);

        cookies.set('session', token, { httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 24, path: '/' }); 
        
        throw redirect(303, '/')
    }
};
