<script>
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  export let show = false;
  export let position = 'bottom-right';
  export let msg = '';
  export let msgs = [];
  export let toastType = 'success';
  export let duration = 3000;

  const dispatch = createEventDispatcher();
  let t;
  let pos = '',
    color = '';
  let x = 20;
  $: {
    pos =
      position === 'top-left'
        ? 'top-0 left-0 mt-4 ml-6'
        : position === 'top-right'
        ? 'top-0 right-0 mt-4 mr-6'
        : position === 'bottom-left'
        ? 'bottom-0 left-0 mb-4 ml-6'
        : 'bottom-0 right-0 mb-4 mr-6';
    x = position.includes('left') ? -20 : 20;
    color =
      toastType === 'success'
        ? 'green'
        : toastType === 'error'
        ? 'red'
        : toastType === 'warning'
        ? 'yellow'
        : toastType === 'info'
        ? 'blue'
        : 'red';

    console.log(
      'Tast',
      toastType,
      typeof toastType,
      color,
      toastType === 'success'
    );
  }
  $: {
    if (t) clearTimeout(t);
    t = setTimeout(() => (show = false), duration);
    dispatch('toastclosed', { show: false });
  }
</script>

{#if show}
  <div
    class="bg-{color}-300 text-{color}-800 font-sans text-sm font-semibold text
    center py-4 w-auto absolute {pos} z-1500 mx-auto rounded-md px-6 select-none"
    transition:fly="{{ x: x, duration: 200 }}"
  >
    <span>
      {#if msgs.length > 0}
        <ul>
          {#each Array(3) as m, i}
            <li>
              ● {msgs[i]}
              {#if i === 2}
                <span class="px-2 font-bold cursor-pointer">x</span>
              {/if}
            </li>
          {/each}
        </ul>
      {:else}
        {msg}
        <span
          class="px-2 font-bold cursor-pointer"
          on:click="{() => {
            show = false;
            dispatch('toastclosed', { show: false });
          }}"
        >
          x
        </span>
      {/if}
    </span>
  </div>
{/if}
