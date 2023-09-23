<script lang="ts">
import { messages, pending_messages } from "./stores/chat";
import { user } from "./stores/user";
import QMessage from "./QMessage.svelte";
</script>

<div class="flex flex-col-reverse items-start w-full max-h-80 pr-3 overflow-x-hidden overflow-y-auto">
    {#each $messages as data, i (i)}
        <QMessage username={data.author.username} content={data.content} />
    {/each}
    {#each $pending_messages as data}
        <QMessage username={$user} content={data.message} pending />
    {/each}
</div>
