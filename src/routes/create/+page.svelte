<script lang="ts">
import { connection_state } from "$lib/stores/connection";

import QInput from "$lib/QInput.svelte";
import QCounter from "$lib/QCounter.svelte";
import QSwitch from "$lib/QSwitch.svelte";
    import QCheckbox from "$lib/QCheckbox.svelte";


let lake_name = '';
let ephemeral_chat = false;
let max_ducks = 25;

let need_password: boolean = false;
let password = '';
</script>

<div>
    <div class="mb-2 flex flex-row items-center">
        <h1 class="font-extrabold text-white text-5xl">Let's <span class="text-yellow">Create</span>!</h1>
    </div>
    
    <form class="w-80">
        <QInput
            label="Lake Name"
            placeholder="Quacks Party"
            icon="material-symbols:water-drop-rounded"

            bind:value={lake_name}
        /> 
        
        <div class="flex flex-row justify-between">
            <QCounter label="Max Ducks" bind:value={max_ducks} />
            <QSwitch label="Ephemeral Chat" bind:value={ephemeral_chat} />
        </div>
        
        <QCheckbox text="lake with password" bind:value={need_password} />
        {#if need_password}
        <QInput
            label="Lake Password"
            type="password"
            placeholder="Insert password"
            icon="mdi:lock"

            bind:value={password}
        />
        {/if}
       
       <button class="btn w-full mt-4" disabled={$connection_state !== 'Connected'}>Create</button> 
    </form>
</div>
