<script lang="ts">
import type { PageData } from "../../$types";
import { page } from "$app/stores";
import { onDestroy, onMount } from "svelte";
import { goto } from "$app/navigation";

import WS_Client from "$lib/ws/websocket";
import { connection_state } from "$lib/stores/connection";
import { resetChat } from "$lib/stores/chat";
import { user } from "$lib/stores/user";

import QChat from "$lib/QChat.svelte";

interface ErrorPacket {
    from_packet_type: string;
    code: string;
}

export let data: PageData;

$: lake_id = $page.params.id;
$: ip = $page.url.searchParams.get("ip") ?? "";
$: if ($connection_state?.includes("Failed to connect")) goto(`/swim?ip=${ip}`);
$: user.set(data?.username ?? '');

const join_room_error = (error: ErrorPacket) => {
    if (error.code === "NOT_FOUND") return goto("/swim?err=NOT_FOUND");
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
    if (WS_Client.instance) WS_Client.instance.sendPacket({ type: "leave_room", data: {} }, () => {});
    resetChat();
});
</script>

<svelte:head>
  <title>Lake #{lake_id} - Quacks</title>
</svelte:head>

<div class="w-full flex flex-row justify-between p-12 pr-24">
    <div></div>
    <QChat />
</div>

