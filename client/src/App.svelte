<script>
  import SignIn from './routes/SignIn.svelte';
  import Toast from './components/Toast.svelte';
  import Router from 'svelte-spa-router';
  import Home from './routes/Home.svelte';
  import Members from './routes/Member.svelte';
  import { push, replace } from 'svelte-spa-router';
  import request from './api/api_functions';
  import { onMount } from 'svelte';

  let show = false;
  let ID = '';
  let label = '';
  let toastType = '';
  let toastMsg = '';
  let route = '/home';

  let routes = {
    '/': SignIn,
    '/home': Home,
    '/members/:new/:id?': Members
  };

  function conditionsFailed(event) {
    console.error('Caught event conditionsFailed', event.detail);
    replace('/wild/conditions-failed');
  }

  function routeLoaded(event) {
    route = event.detail.location;
  }

  $: {
    console.info('Caught event routeLoaded', route);
    if (route.includes('home')) {
      label = 'Register member';
    } else if (route.includes('/members/false')) {
      ID = route.split('/')[3];
      label = 'Delete member';
    }
  }

  window.addEventListener('onresponse', function(e) {
    show = true;
    let success =
      Number.parseInt(e.detail.status) >= 200 &&
      Number.parseInt(e.detail.status) <= 299;
    toastType =
      e.detail.toastType !== '' && e.detail.toastType !== undefined
        ? e.detail.toastType
        : success
        ? 'success'
        : 'error';
    toastMsg = e.detail.statusText;
  });
</script>

<!-- Parent Body -->
<div class="flex h-screen font-sans antialiased">

  <!-- Main Content -->
  <div class="flex relative flex-col flex-1 pb-4 overflow-hidden bg-gray-100">
    <!-- Header -->
    <div
      class="inset-x-0 flex items-center justify-between px-4 py-4 bg-white
      shadow-md z-1500"
    >
      <h1 class="p-4 font-sans text-xl font-semibold text-primary">
        Calvary Blood Church
      </h1>

      <button
        class="px-4 py-2 bg-gray-200 rounded-md outline-none cursor-pointer
        focus:outline-none hover:text-white hover:bg-primary {route === '/' ? 'invisible' : 'visible'}"
        on:click="{() => (route.includes('home') ? push('/members/true') : request('DELETE', 'profile', ID))}"
      >
        {label}
      </button>
    </div>
    <!-- Router -->
    <div id="content" class="flex-1 px-4 pt-2 mt-2 overflow-hidden ">
      <Router
        {routes}
        on:conditionsFailed="{conditionsFailed}"
        on:routeLoaded="{routeLoaded}"
      />
    </div>

    <Toast
      bind:show
      position="bottom-right"
      {toastType}
      bind:msg="{toastMsg}"
      on:toastclosed="{() => (show = false)}"
      duration="5000"
    />
  </div>
</div>
