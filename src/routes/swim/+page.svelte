<script lang="ts">
import { page } from "$app/stores";
import { onMount } from "svelte";
import { goto } from "$app/navigation";
import 'iconify-icon';

import WS_Client from "$lib/ws/websocket";
import QInput from "$lib/QInput.svelte";
import QAlert from "$lib/QAlert.svelte";
import { connection_state, connection_ip } from "./connection";

$: warning = $page.url.searchParams.get('warn') ?? '';
$: error = $page.url.searchParams.get('err') ?? '';
$: ip_param = $page.url.searchParams.get('ip') ?? '';

let options_visible = false;

let id: string;
let new_ws_ip: string;

const gotoLake = (id: string) => goto(`/lake/${id.toUpperCase()}${WS_Client.instance.ip !== WS_Client.default_ip ? `?ip=${WS_Client.instance.ip}` : ''}`);

const changeWsIp = (ip: string) => {
    // if (ip === WS_Client.instance.ip) return error = `You are already connected to ${ip}`;
    new WS_Client(ip, true);
    
    if (!ip) return goto('/swim');
    else if (ip !== WS_Client.default_ip) return goto(`/swim?ip=${ip}`);
}

onMount(() => {
    if (!WS_Client.instance) new WS_Client(ip_param);
    else if (WS_Client.instance.ip !== WS_Client.default_ip && WS_Client.instance.ip !== ip_param) new WS_Client(ip_param, true);
    
    if (WS_Client.instance.ip !== WS_Client.default_ip) options_visible = true;

    if (ip_param === '') new_ws_ip = '';
    else if (ip_param !== WS_Client.default_ip) new_ws_ip = WS_Client.instance.ip;
})

</script>

<svelte:head>
    <title>Swim - Quacks</title>
</svelte:head>

<div class="w-80">
    {#if warning}
            <QAlert color="orange" icon="ph:warning-fill">{ warning }</QAlert>
    {/if}

    {#if error}
            <QAlert color="red" icon="ph:warning-circle-fill">{ error }</QAlert>
    {/if}


    <div class="mb-2 flex flex-row items-center">
        <h1 class="font-extrabold text-white text-4xl sm:text-5xl">Let's <span class="text-yellow">Swim</span>!</h1>
    </div>
    
    <a href="/create" class="btn w-full mt-6 mb-6">Create</a>
    
    <form on:submit|preventDefault={() => gotoLake(id)}>
        <QInput
            label="Lake ID"
            placeholder="XXXXXX"
            icon="mingcute:hashtag-fill"
            regex="^[a-zA-Z0-9]&#123;6&#125;$"
            title="Lake ID of 6 characters"

            bind:value={id}
        />

        <button class="btn w-full mt-4" disabled={$connection_state !== 'Connected'}>Swim</button> 
    </form>

    <div class="mt-2">
        <button type="button" on:click={() => options_visible = !options_visible} class="a-btn font-medium text-white hover:text-yellow text-lg flex flex-row items-center">
            <iconify-icon icon={options_visible ? 'material-symbols:keyboard-arrow-down-rounded' : 'material-symbols:chevron-right-rounded'} class="text-3xl" />
            More Options
        </button>

        {#if options_visible}
            <form class="flex flex-row items-end justify-between" on:submit|preventDefault={() => changeWsIp(new_ws_ip)}>
                <div class="w-[82%]">
                    <QInput
                        label="Custom Server IP"
                        placeholder="0.0.0.0"
                        icon="ph:globe-simple-bold"
                        bind:value={new_ws_ip}
                        not_required
                    />
                </div>
                <button class="btn aspect-square h-12" disabled={$connection_state === 'Connecting'}>
                    <iconify-icon icon="material-symbols:fitbit-check-small-rounded" class="text-4xl" />
                </button>
            </form>
            {#if connection_ip}
                <p class="text-white font-semibold mt-2">{ $connection_state } to { $connection_ip }</p>
            {/if}
        {/if}
    </div>
</div>
