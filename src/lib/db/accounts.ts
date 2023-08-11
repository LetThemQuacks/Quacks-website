import db from '$lib/db/mongo';
import type { UserData } from '$lib/security/tokens';

export const accounts = db.collection('accounts');

export const getUserData = async (username: string) => {
    const user: UserData | null = await accounts.findOne<UserData>({ username: username });

    return user;
}
