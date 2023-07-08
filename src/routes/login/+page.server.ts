import type { Actions } from "@sveltejs/kit";
import { accounts } from "$db/accounts";
import { hash, compare } from '$db/security/hashing';
import { fail } from "@sveltejs/kit";


export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData(); 
        const user: any = await accounts.findOne({ username: formData.get('username') });
        
        if (!user) return fail(404, { msg: 'Messaggio alla famiglia, vostro figlio e\' coglione' })

        const pwd_db = user.password.hash;
        const salt = user.password.salt;

        const pwd_input = formData.get('password')!.toString();
        const pwd_hash = hash(pwd_input, salt).hash;
        
        return {
            success: compare(pwd_hash, pwd_db),
            duck: {
                token: user.token,
                username: user.username,
                skin: user.skin,
                balance: user.balance,
                id: user._id.toString()
            }
        };
    }
};
