<script>
    import QInput from '$lib/QInput.svelte';

    let username = '';
    let password = '';

    let placeholder = (Math.random() + 1).toString(36).substring(2);
    setInterval(() => {
        placeholder = (Math.random() + 1).toString(36).substring(2);
    }, 300);

    fetch('https://test.no', {method: 'POST', body: JSON.stringify({ pwd: 'ciaofra' })})
</script>

<div class="w-80">
    <QInput
        label="username"
        bind:value={username}
        placeholder="LorixDev"
    />
    <QInput
        label="password"
        bind:value={password}
        {placeholder}
    />

    <button class="btn w-full mt-2">Login</button>
</div>
