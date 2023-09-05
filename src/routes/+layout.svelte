<script>
    import '../app.css';
    import QNavbar from '$lib/QNavbar.svelte';
    import { page } from '$app/stores';
</script>

<div class="relative w-full h-screen flex items-center justify-center bg-dark">
    {#if !$page.url.pathname.includes('/login') && !$page.url.pathname.includes('/register')}
        <QNavbar />
    {/if}
    <slot />
</div>
