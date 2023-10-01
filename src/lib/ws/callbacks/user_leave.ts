import { addEvent, type User } from "$lib/stores/chat";
import { getUsernameFromId, removeUser } from "$lib/stores/users";

const user_left = async (data: User) => {
    addEvent({
        type: 'leave',
        data: {
            username: getUsernameFromId(data.id) ?? '#NAME',
            id: data.id,
        },
    });
    removeUser(data.id);
}

export default user_left;

