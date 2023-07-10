import { randomBytes } from 'crypto';
import { accounts } from '$db/accounts';
import { ObjectId } from 'mongodb';

export function generateToken(): string {
    return randomBytes(32).toString('hex');
}

export function encodeToken(id: ObjectId, token: string): string {
    return `${atob(id.toString())}.${token}`;
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

