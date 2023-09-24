<script lang="ts">
import { messages, pending_messages } from "./stores/chat";
import QMessage from "./QMessage.svelte";
import QPendingMessage from "./QPendingMessage.svelte";


</script>

<div class="flex flex-col-reverse items-start w-full max-h-80 pr-3 overflow-x-hidden overflow-y-auto">
    {#each $pending_messages as data (data.idx)}
        <QPendingMessage content={data.message} />
    {/each}
    {#each $messages as data (data.idx)}
        <QMessage username={data.author.username} content={data.content} />
    {/each}
</div>
