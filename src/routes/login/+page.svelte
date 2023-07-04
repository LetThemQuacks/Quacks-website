<script>
    import QInput from '$lib/QInput.svelte';

    let username = '';
    let password = '';

    let placeholder = (Math.random() + 1).toString(36).substring(2);
    setInterval(() => {
        placeholder = (Math.random() + 1).toString(36).substring(2);
    }, 300);
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
