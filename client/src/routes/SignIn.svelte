<script>
  import request from '../api/api_functions';

  let user = {
    username: '',
    password: ''
  };
</script>

<div class="bg-gray-200 h-screen font-sans antialiased pt-22">
  <div class="mx-auto w-1/3 bg-white rounded-lg shadow px-6 py-10 ">
    <h1 class="text-center font-sans text-primary font-semibold">
      Welcome, please sign into your account
    </h1>
    <form action="http://0.0.0.0:3000/signin" method="POST">
      <input
        type="text"
        id="username"
        autocomplete="username"
        placeholder="johndoe@gmail.com"
        bind:value="{user.username}"
        class="mt-4 px-4 py-2 placeholder-gray-500 border border-gray-400
        rounded w-80 block mx-auto"
      />
      <input
        type="password"
        id="password"
        placeholder="password"
        autocomplete="current-password"
        bind:value="{user.password}"
        class="my-4 px-4 py-2 placeholder-gray-500 border border-gray-400
        rounded w-80 block mx-auto"
      />

      <input
        type="button"
        class="px-4 py-2 mb-4 rounded-md cursor-pointer self-center bg-primary
        text-white font-sans mx-auto block"
        value="Sign In"
        on:click|preventDefault="{request('POST', 'signin', user)}"
      />
    </form>
    <p class="text-center text-gray-500 text-xs">
      &copy;2020 ParaSoft Dev Studio. All rights reserved.
    </p>
  </div>
</div>
