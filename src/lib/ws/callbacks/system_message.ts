import { addEvent } from "$lib/stores/chat";

const system_message = (data: { content: string, color: string }) => {
    addEvent({ type: 'system', content: data.content, color: data.color });
}

export default system_message;

