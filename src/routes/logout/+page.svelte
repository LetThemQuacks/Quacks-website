<script lang="ts">
import { enhance } from "$app/forms";
</script>

<form method="POST" action="?/logout" use:enhance class="w-72">
    <h1 class="font-bold text-xl text-white">Are you sure you want to <span class="text-red">Logout</span>?</h1>
    <button class="mt-4 btn w-72 bg-red border-red hover:text-red focus:text-red">Continue</button>
    <a href="/" class="mt-4 a-btn w-full text-center text-lg font-bold text-white hover:text-yellow focus:text-yellow">Swim Home</a>
</form>
