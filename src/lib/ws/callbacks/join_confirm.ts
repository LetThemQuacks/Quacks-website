import { addEvent } from "$lib/stores/chat";
import { user } from "$lib/stores/user";

const join_room = async (_: undefined) => {
    let username = 'You';
    const unsubscribe = user.subscribe((value) => username = value);
    addEvent({
        type: 'join',
        data: {
            username: username,
            id: '',
        }
    });
    unsubscribe();
}

export default join_room;

