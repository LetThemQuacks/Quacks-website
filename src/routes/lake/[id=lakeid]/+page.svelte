<script lang="ts">
import type { PageData } from "../../$types";
import { page } from "$app/stores";
import { onDestroy, onMount } from "svelte";
import { goto } from "$app/navigation";

import WS_Client from "$lib/ws/websocket";

import { addPendingMessage, resetChat } from "$lib/stores/chat";
import { connection_state } from "$lib/stores/connection";
import { user } from "$lib/stores/user";

import QInput from "$lib/QInput.svelte";
import QMessageList from "$lib/QMessageList.svelte";

interface ErrorPacket {
    from_packet_type: string;
    code: string;
}

export let data: PageData;

let new_message: string;

$: lake_id = $page.params.id;
$: user.set(data?.username ?? '');
$: ip = $page.url.searchParams.get("ip") ?? "";
$: if ($connection_state?.includes("Failed to connect")) goto(`/swim?ip=${ip}`);

const join_room_error = (error: ErrorPacket) => {
    if (error.code === "NOT_FOUND") return goto("/swim?err=Oh no! Seems like you are trying to swim into an inexistent lake.");
};

onMount(async () => {
    if (!WS_Client.instance) new WS_Client(ip);
    if (WS_Client.instance.ws.readyState === WebSocket.CLOSED) new WS_Client(ip, true);
    WS_Client.instance.sendPacket(
        {
          type: "join_room",
          data: {
            id: lake_id.toUpperCase().slice(0, 5),
          },
        },
        join_room_error
    );
    resetChat();
});
onDestroy(() => {
    if (WS_Client.instance && $connection_state === 'Connected') WS_Client.instance.sendPacket({ type: "leave_room", data: {} });
    resetChat();
});

let counter = 0;
const generateReqId = (data: string) => {
    counter += 1;
    return btoa(data.slice(0, 16) + counter);
};

const sendMessage = (message: string) => {
    const req_id = generateReqId(message);
    WS_Client.instance.sendPacket({
        type: "send_message",
        data: {
            message: message,
            req_id: req_id,
        },
    });
    addPendingMessage(message, req_id);
    new_message = "";
};
</script>

<svelte:head>
  <title>Lake #{lake_id} - Quacks</title>
</svelte:head>

<div class="flex flex-col items-center justify-end w-80">
    <QMessageList />

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
