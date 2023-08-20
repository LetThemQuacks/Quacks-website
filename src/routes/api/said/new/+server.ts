import { json, type RequestHandler } from '@sveltejs/kit';
import { TOKEN_PEPPER_STR } from '$env/static/private';
import { calculate_said } from '$lib/security/hashing';
import { accounts } from '$lib/db/accounts';
import jwt from 'jsonwebtoken';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { aes, rsa } = await request.json();
    const said = calculate_said(aes, rsa);
    
    const token = cookies.get('session');
    if (!token) return json({ ok: false, msg: 'missing token' }, { status: 401 });

    try {
        const token_payload = jwt.verify(token, TOKEN_PEPPER_STR);
        if (!token_payload || typeof token_payload === 'string') return json({ ok: false, msg: 'invalid token' }, { status: 401 });
        
        const { matchedCount, modifiedCount } = await accounts.updateOne({ _id: token_payload.user._id }, {'$set': { said: said }});
        if (!matchedCount) return json({ ok: false, msg: 'user does not exist' }, { status: 401 });
        if (!modifiedCount) return json({ ok: false, msg: 'internal server error' }, { status: 500 });

    } catch (e: any) {
        if (e.toString().includes('jwt expired')) return json({ ok: false, msg: 'token expired' }, { status: 401 });
        return json({ ok: false, msg: 'internal server error' }, { status: 500 })
    }

	return json({ ok: true, said: said }, { status: 200 });
}

