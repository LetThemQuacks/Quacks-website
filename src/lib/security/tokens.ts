import jwt from 'jsonwebtoken';
import { TOKEN_PEPPER_STR, REFRESH_TOKEN_PEPPER_STR } from '$env/static/private';
import type { ObjectId } from 'mongodb';

export function generateToken(token_payload: { username: string, _id: ObjectId }) {
    const token = jwt.sign({ user: token_payload }, TOKEN_PEPPER_STR, { expiresIn: '7d' });
    const refresh_token = jwt.sign({ user: token_payload }, REFRESH_TOKEN_PEPPER_STR, { expiresIn: '120d' });

    return { token, refresh_token };
}

