<script lang='ts'>
export let content: string;
export let color: string = 'efb820';
</script>

<p class="w-full text-sm font-bold text-center mt-1" style={`color: #${color}`}>
    {content}
</p>
