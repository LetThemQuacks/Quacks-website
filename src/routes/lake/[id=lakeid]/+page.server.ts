import { handleLoginRedirect } from "$lib/utils";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) throw redirect(302, handleLoginRedirect(event));
    return { username: event.locals.user.username };    
}
