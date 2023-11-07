<script lang="ts">
import { connection_state, connection_ip, status_bar } from "$lib/stores/connection";
import { configs } from "$lib/stores/server_configs";
import { lake_password } from "$lib/stores/lake_password";
import { page } from "$app/stores";
import { goto } from "$app/navigation";
import { onMount } from "svelte";
import WS_Client from "$lib/ws/websocket";


import QInput from "$lib/QInput.svelte";
import QCounter from "$lib/QCounter.svelte";
import QSwitch from "$lib/QSwitch.svelte";
import QCheckbox from "$lib/QCheckbox.svelte";


let lake_name = '';
let ephemeral_lake = false;
let max_ducks = 25;

let need_password: boolean = false;

let options_visible = false;
let custom_server = false;
let new_ws_ip: string;

$: ip_param = $page.url.searchParams.get('ip') ?? '';
$: $connection_state, $connection_ip, status_bar.set(`${$connection_state} to ${$connection_ip}`);
$: if ($configs.room_creation?.force_ephemeral) ephemeral_lake = true;
$: if ($configs.room_creation && !$configs.room_creation?.allow) goto('/swim?err=ROOM_CREATION_NOT_ALLOWED');

const createLake = () => {
    let data: { name: string, password?: string, max_joins: number, ephemeral: boolean } = {
        name: lake_name,
        max_joins: max_ducks,
        ephemeral: ephemeral_lake,
    };
    if (need_password && $lake_password) data.password = $lake_password;

    WS_Client.instance.sendPacket(
        {
            type: "create_room",
            data: data,
        },
    );
}

const changeWsIp = (new_ip: string) => {
    if (WS_Client.processIP(new_ip) === WS_Client.processIP(WS_Client.instance.ip)) {
        if ($connection_state === 'Connected' && $connection_ip !== 'Quacks Server') {
            return status_bar.set(`You are already connected to ${$connection_ip}`);
        }
    }

    new WS_Client(new_ip, true);
    new_ws_ip = new_ip;
    
    if (!new_ip) return goto('/create');
    else if (new_ip !== WS_Client.default_ip) return goto(`/create?ip=${new_ip}`);
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

<div class="w-80">
    <div class="mb-4 flex flex-row items-center">
        <h1 class="font-extrabold text-white text-5xl">Let's <span class="text-yellow">Create</span>!</h1>
    </div>
    
    <form on:submit|preventDefault={() => createLake()}>
        <QInput
            label="Lake Name"
            placeholder="Quacks Party"
            icon="material-symbols:water-drop-rounded"

            bind:value={lake_name}
        /> 
        
        <div class="flex flex-row justify-between">
            <QCounter label="Max Ducks" bind:value={max_ducks} />
            <QSwitch
                label="Ephemeral" bind:value={ephemeral_lake}
                disabled={$configs.room_creation?.force_ephemeral}
            />
        </div>
        
        <QCheckbox text="hire a guardian" bind:value={need_password} />
        {#if need_password}
        <QInput
            label="Secret Word"
            type="password"
            placeholder="Insert secret word"
            icon="mdi:lock"

            bind:value={$lake_password}
        />
        {/if}
       
       <button type="submit" class="btn w-full mt-4 disabled:cursor-progress" disabled={$connection_state !== 'Connected'}>Create</button> 
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
