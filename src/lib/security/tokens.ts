import { accounts } from '$lib/db/accounts';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { PEPPER_STR } from '$env/static/private';

export function generateToken(_id: ObjectId, username: string): string {
    return jwt.sign({ _id: _id, username: username }, PEPPER_STR, { expiresIn: '30 days' });
}

export function decodeToken(encoded_token: string): { id: string, token: string } {
    const splitted_token = encoded_token.split('.');

    return {
        id: btoa(splitted_token[0]),
        token: splitted_token[1]
    }
}

export async function userObjectByToken(_token: string) {
    const { id, token } = decodeToken(_token);

    const _id = new ObjectId(id);
    const userObject = await accounts.findOne({ _id: _id, token: token });

    return userObject;
}

