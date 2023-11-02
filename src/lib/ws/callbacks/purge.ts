import { resetChat, pending_messages } from "$lib/stores/chat";

const purge = async (_: any) => {resetChat(); pending_messages.set([])};

export default purge;
