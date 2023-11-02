<script lang="ts">
import WS_Client from "./ws/websocket";
import { chat, pending_messages, addPendingMessage } from "./stores/chat";
import QMessage from "./QMessage.svelte";
import QPendingMessage from "./QPendingMessage.svelte";
import QUserEvent from "./QUserEvent.svelte";
import QInput from "./QInput.svelte";
import { utf8ToBase64 } from "./ws/crypto/arraybuffers";

let new_message: string;

let counter = 0;
const generateReqId = (data: string) => {
    counter += 1;
    return utf8ToBase64(data.slice(0, 16) + counter);
}

const sendMessage = (message: string) => {
    const req_id = generateReqId(message);
    WS_Client.instance.sendPacket({
        type: "send_message",
        data: {
            message: utf8ToBase64(message),
            req_id: req_id,
        },
    });
    addPendingMessage(message, req_id);
    new_message = '';
};
</script>


<div class="flex flex-col items-end justify-end w-80 h-[70vh] sm:mt-24">
    <div class="flex flex-col-reverse items-start w-80 max-h-full pr-3 overflow-y-auto">
        {#each $pending_messages as data (data.idx)}
            <QPendingMessage content={data.message} />
        {/each}
        {#each $chat as event (event.id)}
            {#if event.type === 'message'}
                <QMessage username={event.data.author.username} content={event.data.content} color={event.data.author.color} />
            {:else if event.type === 'join' || event.type === 'leave'}
                <QUserEvent type={event.type} username={event.data.username} />
            {/if}
        {/each}
    </div>


    <form
        class="flex flex-row items-end justify-between mt-4"
        on:submit|preventDefault={() => sendMessage(new_message)}
    >
        <div class="w-[82%]">
            <QInput
                placeholder="Quack Quack"
                bind:value={new_message}
            />
        </div>
        <button class="btn aspect-square h-12">
            <iconify-icon icon="iconamoon:send-fill" class="text-2xl" />
        </button>
    </form>
</div>

