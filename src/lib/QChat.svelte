<script lang="ts">
import { chat, pending_messages } from "./stores/chat";
import QMessage from "./QMessage.svelte";
import QPendingMessage from "./QPendingMessage.svelte";
    import QUserEvent from "./QUserEvent.svelte";


</script>

<div class="flex flex-col-reverse items-start w-full max-h-80 pr-3 overflow-x-hidden overflow-y-auto">
    {#each $pending_messages as data (data.idx)}
        <QPendingMessage content={data.message} />
    {/each}
    {#each $chat as event (event.id)}
        {#if event.type === 'message'}
            <QMessage username={event.data.author.username} content={event.data.content} />
        {:else if event.type === 'join' || event.type === 'leave'}
            <QUserEvent type={event.type} username={event.data.username} />
        {/if}
    {/each}
</div>
