<script lang="ts">
import { page } from "$app/stores";

let current_page: 'home' | 'swim' | 'duck' | '';

$: {
    if ($page.url.pathname === '/') current_page = 'home';
    else if ($page.url.pathname === '/swim') current_page = 'swim';
    else if ($page.url.pathname === '/duck') current_page = 'duck';
    else current_page = '';
}
</script>

<div class="fixed top-12 w-full sm:w-auto">
    <div class="grid grid-cols-[1fr_0fr_1fr_0fr_1fr] items-center w-full">
        <a
            class="a-btn w-[1fr] sm:w-40 text-center text-white hover:text-yellow focus:text-yellow"
            class:pointer-events-none={current_page === 'home'}
            class:text-yellow={current_page === 'home'}
            href="/"
        >Home</a>
    
        <div class="border-[2px] h-6 sm:h-10 border-left border-yellow rounded-sm" />

        <a
            class="a-btn w-[1fr] sm:w-40 text-center text-white hover:text-yellow focus:text-yellow"
            class:pointer-events-none={current_page === 'swim'}
            class:text-yellow={current_page === 'swim'}
            href="/swim"
        >Swim</a>
    
        <div class="border-[2px] h-6 sm:h-10 border-left border-yellow rounded-sm" />
    
        <a
            class="a-btn w-[1fr] sm:w-40 text-center text-white hover:text-yellow focus:text-yellow"
            class:pointer-events-none={current_page === 'duck'}
            class:text-yellow={current_page === 'duck'}
            href="/duck"
        >Duck</a>
    </div>
</div>

