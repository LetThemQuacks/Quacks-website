import db from '$db/mongo';

export const accounts = db.collection('accounts');
