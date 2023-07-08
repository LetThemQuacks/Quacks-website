import type { Actions } from "@sveltejs/kit";

/*
quello penso sia una good pratice ma non e' obbligatorio mettere il * ogni linea 
lo mette in automatico lsp perche boh

guarda le good pratice nei commmenti possono solo succhiar


mi faccia fare dei test
*/

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
        console.log({username: data.get('username'), password: data.get('password')})
    }
};
