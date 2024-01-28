import { addUser, type User } from "$lib/stores/users";

const user_join = async (data: User) => {
    addUser(data);
}

export default user_join;

