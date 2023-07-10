import type { Actions } from "@sveltejs/kit";
import { accounts } from "$db/accounts";
import { generateToken, encodeToken } from "$db/security/tokens";
import { hash } from '$db/security/hashing';
import { fail } from "@sveltejs/kit";


interface NewUserData {
    username: string;
    password: {
        hash: string;
        salt: string;
    }
    token: string;
    skin: string;
    balance: number;
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();         
        const data = Object.fromEntries(formData.entries());
        
        const username = data.username.toString();
        const pwd_input = data.password.toString();
        const password = hash(pwd_input); 
    
        if (await accounts.findOne({ username: username })) return fail(400, { success: false, msg: 'Username already exists' });
        
        const token = generateToken();

        const new_user: NewUserData = {
            username: username,
            password: {
                hash: password.hash,
                salt: password.salt,
            },
            token: token,
            skin: 'yellow',
            balance: 0,
        }
        const { insertedId: id } = await accounts.insertOne(new_user);

        return { success: true, token: encodeToken(id, token) }
    }
};
