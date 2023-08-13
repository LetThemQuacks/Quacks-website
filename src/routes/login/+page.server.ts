import type { Actions } from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";

import { generateToken } from "$lib/security/tokens";
import { getUserData, type UserData } from "$lib/db/accounts";
import { verifyPassword } from "$lib/security/auth";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ url }) => {
    const redirectTo = url.searchParams.get('redirect')?.slice(1)
    return { redirectTo: `?redirect=/${redirectTo ?? ''}` }
}

export const actions: Actions = {
	default: async ({ request, cookies, url }) => {
		const formData = await request.formData(); 
        const data = Object.fromEntries(formData.entries());
        
        const username = data.username.toString();

        const user: UserData | null = await getUserData(username);
        if (!user) return fail(404, { error: 'Wrong username or password', username: username });
        
        const success = verifyPassword(data.password.toString(), user.password!);
        if (!success) return fail(404, { error: 'Wrong username or password', username: username });
        
        const { token } = generateToken({ username: user.username, _id: user._id! });
        cookies.set('session', token, { httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 24, path: '/' }); 
                
        const redirectTo = url.searchParams.get('redirect');
        if (redirectTo) throw redirect(302, `/${redirectTo.slice(1)}`);
        throw redirect(302, '/')
    }
};
