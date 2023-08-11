import jwt from 'jsonwebtoken';
import { PEPPER_STR } from '$env/static/private';
import type { ObjectId } from 'mongodb';

export interface UserData {
    username: string;
    password?: {
        hash: string;
        salt: string;
    }
    skin: string;
    balance: number;
    _id?: ObjectId;
}

export function generateToken(token_payload: { username: string, _id: ObjectId }): string {
    const token = jwt.sign(
        { user: token_payload },
        PEPPER_STR,
        { expiresIn: '24h' },
    );
    return token;
}

