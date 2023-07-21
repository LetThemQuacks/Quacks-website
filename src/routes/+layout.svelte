<script>
    import '../app.css';
</script>

<svelte:head>
    <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,300,400&display=swap" rel="stylesheet"> 
</svelte:head>

<div class="w-full h-screen grid place-items-center bg-dark">
    <slot />
</div>
