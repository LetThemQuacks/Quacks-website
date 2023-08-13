import db from '$lib/db/mongo';
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


export const accounts = db.collection('accounts');

export const getUserData = async (username: string) => {
    const user: UserData | null = await accounts.findOne<UserData>({ username: username });

    return user;
}
