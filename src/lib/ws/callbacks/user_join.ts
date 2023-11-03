import type { User } from "$lib/stores/chat";
import { addUser } from "$lib/stores/users";

const user_join = async (data: User) => {
    addUser(data);
}

export default user_join;

