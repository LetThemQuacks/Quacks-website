import { MongoClient } from 'mongodb';
import { CONNECTION_URL, DATABASE } from '$env/static/private';

const client = new MongoClient(CONNECTION_URL);

export function start_mongo(): Promise<MongoClient> {
    console.log('[mongodb] Starting...');
    return client.connect();
}

export default client.db(DATABASE);
