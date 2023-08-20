import { json, type RequestHandler } from '@sveltejs/kit';
import { calculate_said, compare } from '$lib/security/hashing';
import { accounts, type UserData } from '$lib/db/accounts';

export const POST: RequestHandler = async ({ request }) => {
	const { aes, rsa, said } = await request.json();
    const generated_said = calculate_said(aes, rsa);

    const said_ok = compare(generated_said, said);
    if (!said_ok) return json({ ok: false, msg: 'invalid said' }, { status: 401 })
    
    const user = await accounts.findOne<UserData>({ said: said });
    if (!user) return json({ ok: false, msg: 'user does not exist' }, { status: 401 });
        
    const profile = {
        user_id: user._id,
        username: user.username,
        skin: user.skin,
    }
   
    return json({ ok: true, profile: profile }, { status: 200 });
}

