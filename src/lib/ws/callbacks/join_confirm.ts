import { add } from "../../../routes/lake/[id=lakeid]/globals/chat";

const join_room = async (_: undefined) => {
    console.log('Succesfully connected');
    add('you found it!');
    add('now you can swim');
}

export default join_room;

