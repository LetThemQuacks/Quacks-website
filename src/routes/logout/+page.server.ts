import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    logout: async ({ cookies }) => {
        cookies.set('session', '', { maxAge: 0 });
        throw redirect(303, '/login');
    } 
}
