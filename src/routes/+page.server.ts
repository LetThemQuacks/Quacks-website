import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ locals }) => {
    if (!locals.user) return { logged: false };
    return { logged: true, username: locals.user.username };
}

