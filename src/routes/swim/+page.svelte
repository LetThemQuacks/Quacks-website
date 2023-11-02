<script lang="ts">
import { page } from "$app/stores";
import { connection_state, connection_ip, status_bar } from "$lib/stores/connection";
import { configs } from "$lib/stores/server_configs";
import { onMount } from "svelte";
import { goto } from "$app/navigation";
import 'iconify-icon';

import WS_Client from "$lib/ws/websocket";
import QInput from "$lib/QInput.svelte";
import QAlert from "$lib/QAlert.svelte";
import QCheckbox from "$lib/QCheckbox.svelte";
import { getError, getWarn } from "./errors";

$: warning = getWarn($page.url.searchParams.get('warn') ?? '');
$: error = getError($page.url.searchParams.get('err') ?? '');
$: ip_param = $page.url.searchParams.get('ip') ?? '';
$: $connection_state, $connection_ip, status_bar.set(`${$connection_state} to ${$connection_ip}`)

let options_visible = false;
let custom_server = false;

let id: string;
let new_ws_ip: string;

const gotoLake = (id: string) => goto(`/lake/${id.toUpperCase()}${WS_Client.instance.ip !== WS_Client.default_ip ? `?ip=${WS_Client.instance.ip}` : ''}`);

const changeWsIp = (new_ip: string) => {
    if (WS_Client.processIP(new_ip) === WS_Client.processIP(WS_Client.instance.ip)) {
        if ($connection_state === 'Connected' && $connection_ip !== 'Quacks Server') {
            return status_bar.set(`You are already connected to ${$connection_ip}`);
        }
    }

    new WS_Client(new_ip, true);
    new_ws_ip = new_ip;
    
    if (!new_ip) return goto('/swim');
    else if (new_ip !== WS_Client.default_ip) return goto(`/swim?ip=${new_ip}`);
}

onMount(() => {
    if (!WS_Client.instance) new WS_Client(ip_param);
    if (WS_Client.instance.ip !== WS_Client.default_ip) {
        if (WS_Client.instance.ip !== ip_param) new WS_Client(ip_param, true);
        options_visible = true;
        custom_server = true;
    }
    
    new_ws_ip = ip_param;
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
        <h1 class="font-extrabold text-white text-5xl">Let's <span class="text-yellow">Swim</span>!</h1>
    </div>
    
    <button
        type="button"
        on:click={() => goto(`/create/${ip_param ? `?ip=${ip_param}` : ''}`)} 
        disabled={!$configs.room_creation?.allow || $connection_state !== 'Connected'}
        class="btn w-full mt-6 mb-6"
    >
        Create
    </button>
    
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
            <QCheckbox text="custom server" bind:value={custom_server} disabled={$connection_state === 'Connecting'} on:disabled={() => changeWsIp('')} />
            {#if custom_server}
            <form class="flex flex-row items-end justify-between" on:submit|preventDefault={() => changeWsIp(new_ws_ip)}>
                <div class="w-[82%]">
                    <QInput
                        label="Custom Server IP"
                        placeholder="0.0.0.0:5000"
                        icon="ph:globe-simple-bold"
                        bind:value={new_ws_ip}
                    />
                </div>
                <button class="btn aspect-square h-12 disabled:cursor-progress" disabled={$connection_state === 'Connecting'}>
                    <iconify-icon icon="material-symbols:fitbit-check-small-rounded" class="text-4xl" />
                </button>
            </form>
            {/if}
            {#if connection_ip}
                <p class="font-semibold mt-2"
                    class:text-green={$status_bar.includes('Connected')}
                    class:text-white={$status_bar.includes('Connecting') || $status_bar.includes('You are already connected to')}
                    class:text-red={$status_bar.includes('Failed to connect')}
                >{ $status_bar }</p>
            {/if}
        {/if}
    </div>
</div>
