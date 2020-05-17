<script>
  import { pop } from 'svelte-spa-router';
  import { onMount } from 'svelte';
  import request from '../api/api_functions';
  import WideTable from '../components/WideTable.svelte';
  import PageTitle from '../components/PageTitle.svelte';

  onMount(async () => {
    await request('GET', 'profiles');
  });
</script>

<PageTitle title="All Members" isIndex="{true}" />

<WideTable />
