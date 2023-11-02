<script lang="ts">
import { user } from "$lib/stores/user";
import { chat } from "./stores/chat";

export let username: string;
export let content: string;
export let color: string;
let shown_username = username;

let is_me = false;
if (username === $user) shown_username = 'You', is_me = true;

let previous_is_me = false;
if ($chat[1]?.type === 'message' && $chat[1]?.data.author.username === username) previous_is_me = true;
</script>

<div
    class="flex flex-row mt-1 last:mt-0 max-w-[16rem]"
    class:self-end={is_me}
>
    {#if !is_me && !previous_is_me}
        <div class={`mr-3 h-8 aspect-square rounded-lg bg-[#${color}]`} ></div>
    {/if}

    <div
        class="flex flex-col break-words"
        class:ml-11={previous_is_me && !is_me}
        class:max-w-full={is_me}
        class:max-w-[14rem]={!is_me}
    >
        {#if !previous_is_me}
        <p
            class={`text-[#${color}] text-sm font-semibold`}
            class:text-right={is_me}
            class:text-left={!is_me}
        >{shown_username}</p>
        {/if}
        <p
            class="text-white text-lg font-medium"
            class:text-right={is_me}
        >{content}</p>
    </div>
</div>

