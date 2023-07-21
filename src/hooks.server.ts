import { start_mongo } from "$lib/db/mongo";

start_mongo().then(async () => {
    console.log('[mongodb] Connected!');
}).catch((e) => {
    console.log('[mongodb] ERROR: ' + e)
});

