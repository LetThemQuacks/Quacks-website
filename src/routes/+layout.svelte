<script>
    import '../app.css';
    import QNavbar from '$lib/QNavbar.svelte';

</script>

<div class="relative w-full h-screen flex items-center justify-center bg-dark">
    <QNavbar />
    <slot />
</div>
