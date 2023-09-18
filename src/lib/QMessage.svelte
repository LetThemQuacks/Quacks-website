<script lang="ts">
import { user } from "$lib/stores/user";

export let username: string;
export let content: string;
export let pending: boolean = false;

let is_you = false;
$: if (username === '' || username === $user) {
        username = 'You';
        is_you = true;
}
</script>

<div
    class="flex flex-col mt-2 first:mt-0 max-w-[80%] break-words"
    class:self-end={is_you}
    class:opacity-40={pending}
>
    <p
        class="text-yellow text-sm font-semibold"
        class:text-right={is_you}
    >{username}</p>
    <p
        class="text-white text-lg font-medium"
        class:text-right={is_you}
    >{content}</p>
</div>

