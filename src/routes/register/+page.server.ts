import type { Actions } from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";

import { generateToken } from "$lib/security/tokens";
import { accounts, type UserData } from "$lib/db/accounts";
import { hash } from '$lib/security/hashing';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();         
        const data = Object.fromEntries(formData.entries());
        
        const username = data.username.toString();
        const pwd_input = data.password.toString();
        const password = hash(pwd_input); 
    
        if (await accounts.findOne({ username: username })) {
            return fail(400, { success: false, msg: 'Username already exists' });
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

        throw redirect(303, '/');
    }
};
