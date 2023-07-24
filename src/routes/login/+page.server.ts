import type { Actions } from "@sveltejs/kit";
import type { UserData } from "$lib/security/tokens";
import { accounts } from "$lib/db/accounts";
import { hash, compare } from '$lib/security/hashing';
import { generateToken } from "$lib/security/tokens";
import { fail, redirect } from "@sveltejs/kit";


export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData(); 
        const data = Object.fromEntries(formData.entries());

        const user: UserData | null = await accounts.findOne<UserData>({ username: data.username.toString() });
        
        if (!user) return fail(404, { success: false, msg: 'Wrong username or password', username: data.username.toString() })

        const pwd_db = user.password!.hash;
        const salt = user.password?.salt;
        
        const pwd_input = data.password.toString();
        const pwd_hash = hash(pwd_input, salt).hash;
        
        const success = compare(pwd_hash, pwd_db);
        if (!success) return fail(404, { success: false, msg: 'Wrong username or password', username: data.username.toString() })

        const token = generateToken(user);

        cookies.set('session', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 60, // 60 days
            path: '/'
        });
        
        throw redirect(303, '/')
    }
};
