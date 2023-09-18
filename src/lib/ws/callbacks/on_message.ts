import { addMessage, type MessageData } from "$lib/stores/chat";

const on_message = async (data: MessageData) => addMessage(data);

export default on_message;

