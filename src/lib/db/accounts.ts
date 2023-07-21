import db from '$lib/db/mongo';

export const accounts = db.collection('accounts');
