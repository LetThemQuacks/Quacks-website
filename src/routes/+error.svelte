<script>
  import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center">
    <h1 class="text-white font-medium text-4xl">
        <span class="text-red font-bold">Error {$page.status}:</span>
        {$page.error?.message}
    </h1>
    <a href="/" class="btn mt-12 w-72 text-center">Swim Home</a>
</div>
