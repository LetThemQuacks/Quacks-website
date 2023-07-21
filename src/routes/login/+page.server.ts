import type { Actions } from "@sveltejs/kit";
import { accounts } from "$lib/db/accounts";
import { hash, compare } from '$lib/security/hashing';
import { encodeToken } from "$lib/security/tokens";
import { fail } from "@sveltejs/kit";
import type { ObjectId } from "mongodb";

interface UserData {
    username: string;
    password: {
        hash: string;
        salt: string;
    }
    token: string;
    skin: string;
    balance: number;
    _id: ObjectId;
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData(); 
        const user: UserData | null = await accounts.findOne<UserData>({ username: formData.get('username') });
        
        if (!user) return fail(404, { success: false, msg: 'Wrong username or password' })

        const pwd_db = user.password.hash;
        const salt = user.password.salt;

        const pwd_input = formData.get('password')!.toString();
        const pwd_hash = hash(pwd_input, salt).hash;
        
        const success = compare(pwd_hash, pwd_db);
        if (!success) return fail(404, { success: false, msg: 'Wrong username or password' })
        return { token: encodeToken(user._id, user.token) }
    }
};
