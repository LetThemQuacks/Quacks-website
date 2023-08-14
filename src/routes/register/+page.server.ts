import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { fail, redirect } from "@sveltejs/kit";

import { generateToken } from "$lib/security/tokens";
import { accounts, type UserData } from "$lib/db/accounts";
import { hash } from '$lib/security/hashing';

export const load: PageServerLoad = async ({ locals, url }) => {
    const redirectTo = url.searchParams.get('redirect');
    if (locals.user && redirectTo) throw redirect(302, `/${redirectTo.slice(1)}`);

    if (locals.user) return { username: locals.user.username };
}

export const actions: Actions = {
	default: async ({ request, cookies, url }) => {
		const formData = await request.formData();         
        const data = Object.fromEntries(formData.entries());
        
        const username = data.username.toString();
        const pwd_input = data.password.toString();
        const password = hash(pwd_input); 
    
        if (await accounts.findOne({ username: username })) {
            return fail(400, { error: 'Username already exists' });
        }

        let new_user: UserData = {
            username: username,
            password: password,
            skin: 'yellow',
            balance: 0,
        } 
        const { insertedId } = await accounts.insertOne(new_user);
        
        const { token } = generateToken({ username: new_user.username, _id: insertedId });
        cookies.set('session', token, { httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 24, path: '/' }); 

        const redirectTo = url.searchParams.get('redirect');
        if (redirectTo) throw redirect(302, `/${redirectTo.slice(1)}`);
        throw redirect(302, '/')
    }
};
