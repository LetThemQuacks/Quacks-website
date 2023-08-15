import { handleLoginRedirect } from "$lib/utils";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) throw redirect(302, handleLoginRedirect(event));
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData(); 
        const data = Object.fromEntries(formData.entries());

        throw redirect(302, `/lake/${data["Lake ID"].toString().toUpperCase()}`)
    }
}
