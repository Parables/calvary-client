<script>
  import { ProfileStore, currentItem } from './../api/store';
  import { pop } from 'svelte-spa-router';
  import request from '../api/api_functions';
  import PageTitle from '../components/PageTitle.svelte';
  export let params = { new: '', id: '' };

  export let profile = {
    name: '',
    phoneNumber: '',
    dob: '',
    nationality: '',
    gender: '',
    postalAddress: '',
    branch: '',
    houseAddress: '',
    childCount: 0,
    maritalStatus: ''
  };

  if (params.new === 'false') profile = $currentItem;

  function createMember() {
    request('POST', 'profile', profile);
  }

  function updateMember() {
    delete profile._id;
    delete profile.__v;
    if (profile.dob === null) profile.dob = '';
    profile.id = params.id;
    request('PATCH', 'profile', profile);
  }
</script>

<PageTitle
  title="{params.new === 'true' ? 'Add New Member' : 'Edit Member Info'}"
/>

<div class="px-4 py-10 overflow-y-auto h-120 ">
  <div class="flex items-center mx-auto justify-evenly">
    <div class="flex flex-col">
      <label for="name">Name:</label>
      <input
        type="text"
        id="name"
        placeholder="Name"
        bind:value="{profile.name}"
        class="px-4 py-2 placeholder-gray-500 border border-gray-400 rounded
        w-80"
      />
    </div>

    <div class="flex flex-col">
      <label for="postal-address">Postal Address:</label>
      <input
        type="text"
        id="postal-address"
        placeholder="Postal Address"
        bind:value="{profile.postalAddress}"
        class="px-4 py-2 placeholder-gray-500 border border-gray-400 rounded
        w-80"
      />
    </div>
  </div>

  <div class="flex items-center pt-4 mx-auto justify-evenly">
    <div class="flex">
      <!--   <div class="flex flex-col">
        <label for="age">Age:</label>
        <input
          type="number"
          min=1
          max=200
          id="age"
          placeholder="Age"
                      bind:value={profile.postalAddress}
  class="w-24 px-4 py-2 mr-4 placeholder-gray-500 border border-gray-400 rounded"
        />
      </div> -->
      <div class="flex flex-col">
        <label for="phone">Phone Number:</label>
        <input
          type="text"
          max="10"
          id="phone"
          placeholder="Phone Number"
          bind:value="{profile.phoneNumber}"
          class="px-4 py-2 placeholder-gray-500 border border-gray-400 rounded
          w-80"
        />
      </div>
    </div>

    <div class="flex flex-col">
      <label for="branch">Branch:</label>
      <input
        type="text"
        id="branch"
        placeholder="Branch"
        bind:value="{profile.branch}"
        class="px-4 py-2 placeholder-gray-500 border border-gray-400 rounded
        w-80"
      />
    </div>
  </div>

  <div class="flex items-center pt-4 mx-auto justify-evenly">
    <div class="flex flex-col">
      <label for="dob">Date of Birth:</label>
      <input
        type="date"
        id="dob"
        placeholder="Date of Birth"
        bind:value="{profile.dob}"
        class="px-4 py-2 placeholder-gray-500 border border-gray-400 rounded
        w-80"
      />
    </div>

    <div class="flex flex-col">
      <label for="house-address">House Address:</label>
      <input
        type="text"
        id="house-address"
        placeholder="House Address"
        bind:value="{profile.houseAddress}"
        class="px-4 py-2 placeholder-gray-500 border border-gray-400 rounded
        w-80"
      />
    </div>
  </div>

  <div class="flex items-center pt-4 mx-auto justify-evenly">
    <div class="flex flex-col">
      <label for="nationality">Nationality:</label>
      <select
        id="nationality"
        placeholder="Nationality"
        bind:value="{profile.nationality}"
        class="px-4 py-2 placeholder-gray-500 bg-white border border-gray-400
        rounded w-80"
      >
        <option class="cursor-not-allowed">-- select option --</option>
        <option value="Ghana">Ghana</option>
        <option value="Togo">Togo</option>
      </select>
    </div>

    <div class="flex flex-col">
      <label for="child-count">No. of children:</label>
      <input
        type="number"
        id="child-count"
        placeholder="No. of children"
        bind:value="{profile.childCount}"
        class="px-4 py-2 placeholder-gray-500 border border-gray-400 rounded
        w-80"
      />
    </div>
  </div>

  <div class="flex items-center pt-4 mx-auto justify-evenly">
    <div class="flex flex-col">
      <label for="gender">Gender:</label>
      <select
        id="gender"
        placeholder="Gender"
        bind:value="{profile.gender}"
        class="px-4 py-2 placeholder-gray-500 bg-white border border-gray-400
        rounded w-80"
      >
        <option class="cursor-not-allowed">-- select option --</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>

    <div class="flex flex-col">
      <label for="status">Marital status:</label>
      <select
        id="status"
        placeholder="Marital status"
        bind:value="{profile.maritalStatus}"
        class="px-4 py-2 placeholder-gray-500 bg-white border border-gray-400
        rounded w-80"
      >
        <option class="cursor-not-allowed" value="">-- select option --</option>
        <option value="Married">Married</option>
        <option value="Single">Single</option>
        <option value="Divorced">Divorced</option>
        <option value="Widow/Widower">Widow/Widower</option>
      </select>
    </div>
  </div>

  <div class="flex justify-end px-6 py-4 mr-48">
    <button
      class="px-4 py-2 mr-6 bg-transparent rounded-md outline-none
      cursor-pointer focus:outline-none hover:text-white hover:bg-primary"
      on:click="{() => pop()}"
    >
      Cancel
    </button>
    <button
      class="px-4 py-2 bg-gray-200 rounded-md outline-none cursor-pointer
      focus:outline-none hover:text-white hover:bg-primary"
      on:click|preventDefault="{params.new === 'true' ? createMember : updateMember}"
    >
      Save
    </button>
  </div>

</div>
