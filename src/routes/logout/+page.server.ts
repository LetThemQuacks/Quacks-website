import type { PageServerLoad } from "../$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies }) => {
    cookies.set('session', '', { maxAge: 0 });
    throw redirect(303, '/login');
}
