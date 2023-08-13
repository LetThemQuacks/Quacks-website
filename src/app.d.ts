// See https://kit.svelte.dev/docs/types#app

import type { UserData } from "$lib/db/accounts";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
            user: UserData | undefined
        }
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
