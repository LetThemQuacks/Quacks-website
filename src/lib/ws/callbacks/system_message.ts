import { addEvent } from "$lib/stores/chat";

const system_message = (data: { id: string, content: string, color: string }) => {
    console.log(data.id)
    addEvent({
        type: 'system',
        data: {
            id: data.id,
            content: data.content,
            color: data.color
        }
    });
}

export default system_message;

