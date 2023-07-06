<script lang="ts">
    import QInput from '$lib/QInput.svelte';

    let username = '';
    let password = '';

    const random_string = (length: number) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    
    let placeholder = '';
    /* let new_str = random_string(12);
    let old_str = random_string(12);
    let index = 1;
    
    setInterval(() => {
        placeholder = old_str.slice(index) + new_str.slice(-index).split("").reverse().join("");
        console.log(placeholder)
        index += 1;
        if (index > 12) {
          index = 1;
          new_str = random_string(12)
        }
    }, 150) */ 
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
        type="password"
        {placeholder}
    />

    <button class="btn w-full mt-2">Login</button>
</div>
