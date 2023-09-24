import { addEvent, type User } from "$lib/stores/chat";

const user_join = async (data: User) => {
    addEvent({
        type: 'join',
        data: data,
    });
}

export default user_join;

