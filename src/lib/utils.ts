import type { ServerLoadEvent } from "@sveltejs/kit";

export function handleLoginRedirect(event: ServerLoadEvent) {
    const redirectTo = event.url.pathname + event.url.search;
    return `/login?redirect=${redirectTo}`;
}
