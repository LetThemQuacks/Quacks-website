<script lang="ts">
import { you } from "$lib/stores/you";
import { chat } from "./stores/chat";
import { authors, online_users } from "./stores/users";

export let id: string;
export let idx: number;
export let username: string;
export let content: string;
export let color: string;

let is_me = false;
$: if (id === $you.id && (username || !username)) username = 'You', is_me = true;

let previous_is_me = false;
if ($chat[idx+1]?.type === 'message' && $chat[idx+1]?.data.author?.id === id) previous_is_me = true;

$: if (!username) username = $online_users[id]?.username ?? $authors[id]?.username ?? 'NOT_FOUND';
$: if (!color) color = $online_users[id]?.color ?? $authors[id]?.color ?? 'efb820';
</script>

<div
    class="flex flex-row mt-1 last:mt-0 max-w-[16rem]"
    class:self-end={is_me}
>
    {#if !is_me && !previous_is_me}
        <div class="mr-3 h-8 aspect-square rounded-lg" style={`background-color: #${color}`} ></div>
    {/if}

    <div
        class="flex flex-col break-words"
        class:ml-11={previous_is_me && !is_me}
        class:max-w-full={is_me}
        class:max-w-[14rem]={!is_me}
    >
        {#if !previous_is_me}
        <p
            style={`color: #${color}`}
            class="text-sm font-semibold"
            class:text-right={is_me}
            class:text-left={!is_me}
        >{username}</p>
        {/if}
        <p
            class="text-white text-lg font-medium"
            class:text-right={is_me}
        >{content}</p>
    </div>
</div>

