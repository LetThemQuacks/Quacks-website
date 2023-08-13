import jwt from 'jsonwebtoken';
import { PEPPER_STR, REFRESH_TOKEN_PEPPER_STR } from '$env/static/private';
import type { ObjectId } from 'mongodb';

export function generateToken(token_payload: { username: string, _id: ObjectId }) {
    const token = jwt.sign({ user: token_payload }, PEPPER_STR, { expiresIn: '24h' });
    const refresh_token = jwt.sign({ user: token_payload }, REFRESH_TOKEN_PEPPER_STR, { expiresIn: '120d' });

    return { token, refresh_token };
}

