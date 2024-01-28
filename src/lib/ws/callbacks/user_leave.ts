import { removeUser, type User } from "$lib/stores/users";

const user_left = async (data: User) => {
    removeUser(data.id);
}

export default user_left;

