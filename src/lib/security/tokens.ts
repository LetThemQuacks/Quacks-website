import { accounts } from '$lib/db/accounts';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { PEPPER_STR } from '$env/static/private';

export interface UserData {
    username: string;
    password?: {
        hash: string;
        salt: string;
    }
    token: string;
    skin: string;
    balance: number;
    _id: ObjectId;
}

export function generateToken(user: UserData): string {
    const { password, ...user_without_pwd } = user;
    return jwt.sign({ user: user_without_pwd }, PEPPER_STR, { expiresIn: '60 days' });
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

