<script lang='ts'>
export let type: 'join' | 'leave';
export let username: string;
</script>

<p class="w-full text-yellow text-sm font-bold text-center mt-1">
    { username } { type === 'join' ? 'swum here' : 'swum away' }.
</p>
