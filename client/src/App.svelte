<script>
  import Toast from './components/Toast.svelte';
  import Router from 'svelte-spa-router';
  import Home from './routes/Home.svelte';
  import Members from './routes/Member.svelte';
  import { push, replace } from 'svelte-spa-router';
  import request from './api/api_functions';

  let show = false;
  let isEdit = false;
  let ID = '';
  let label = '';
  let routes = {
    '/': Home,
    '/members/:new/:id?': Members
  };

  function conditionsFailed(event) {
    console.error('Caught event conditionsFailed', event.detail);
    replace('/wild/conditions-failed');
  }

  function routeLoaded(event) {
    console.info('Caught event routeLoaded', event.detail);
    let location = `${event.detail.location}`;
    if (location.toString().includes('false')) {
      isEdit = true;
      let a = location.split('/');
      ID = a[3];
      label = 'Delete member';
    } else {
      isEdit = false;
      ID = '';
      label = 'Register member';
    }
  }

  /*   //Listen to your custom event
  window.addEventListener('onresponse', function(e) {
    console.log('printer state changed', e.detail);
  }); */
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
        focus:outline-none hover:text-white hover:bg-primary"
        on:click="{() => (isEdit ? request('DELETE', 'profile', ID) : push('/members/true'))}"
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
    <label>
      <input type="checkbox" bind:checked="{show}" />
      Toast Msg
    </label>

    <Toast {show} position="top-right" type="error" msg="Success" />
  </div>
</div>
