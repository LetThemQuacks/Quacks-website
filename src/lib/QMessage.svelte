<script lang="ts">
import { user } from "$lib/stores/user";
import { messages } from "./stores/chat";

export let username: string;
export let content: string;
export let pending: boolean = false;

let is_me = false;
$: if (username === '' || username === $user) {
        username = 'You';
        is_me = true;
}

const previous_author = $messages[1]?.author.username;
let previous_is_me = false;

if (previous_author === username) previous_is_me = true;

</script>

<div
    class="flex flex-row mt-1 last:mt-0 max-w-[80%]"
    class:self-end={is_me}
>
    {#if !is_me && !previous_is_me}
        <!-- pfp -->
        <div class="mr-3 h-8 aspect-square rounded-lg bg-yellow"></div>
    {/if}

    <div
        class="flex flex-col break-words max-w-full"
        class:opacity-40={pending}
        class:ml-11={previous_is_me}
    >
        {#if !previous_is_me && !pending}
        <p
            class="text-yellow text-sm font-semibold"
            class:text-right={is_me}
        >{username}</p>
        {/if}
        <p
            class="text-white text-lg font-medium"
            class:text-right={is_me}
        >{content}</p>
    </div>
</div>

