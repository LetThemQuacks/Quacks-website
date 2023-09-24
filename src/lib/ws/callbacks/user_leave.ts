import { addEvent, type User } from "$lib/stores/chat";

const user_left = async (data: User) => {
    addEvent({
        type: 'leave',
        data: data,
    });
}

export default user_left;

