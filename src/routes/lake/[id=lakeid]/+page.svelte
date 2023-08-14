<script lang="ts">
import { page } from "$app/stores";   

let lake_id: any;
$: lake_id = $page.params.id
</script>

<h1 class="font-medium text-white text-xl">laghetto <span class="text-yellow">#{lake_id}</span></h1>
