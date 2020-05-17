<script>
  import { ProfileStore , currentItem} from './../api/store';
  import { push } from 'svelte-spa-router';
</script>

<div class="flex flex-col">
  <div class="py-2 -my-2 overflow-x-auto">
    <div
      class="inline-block min-w-full overflow-hidden align-middle border-b
      border-gray-200 shadow sm:rounded-lg"
    >
      <table class="min-w-full">
        <thead>
          <tr>
            <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider
              text-left text-gray-500 uppercase border-b border-gray-200
              bg-gray-50"
            >
              Name
            </th>
            <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider
              text-left text-gray-500 uppercase border-b border-gray-200
              bg-gray-50"
            >
              Date of Birth
            </th>
            <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider
              text-left text-gray-500 uppercase border-b border-gray-200
              bg-gray-50"
            >
              Gender
            </th>
            <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider
              text-left text-gray-500 uppercase border-b border-gray-200
              bg-gray-50"
            >
              Branch & Posiiton
            </th>
            <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider
              text-left text-gray-500 uppercase border-b border-gray-200
              bg-gray-50"
            >
              Marital Status
            </th>
            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
          </tr>
        </thead>
        <tbody class="bg-white">
          {#each $ProfileStore as item}
            <tr>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-10 h-10">
                    <img
                      class="w-10 h-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div class="ml-4">
                    <div
                      class="text-sm font-semibold font-sans leading-5
                      text-gray-900"
                    >
                      {item.name}
                    </div>
                    <div class="text-sm leading-5 text-gray-500">
                      {item.phoneNumber === '' ? 'Phone Number' : item.phoneNumber}
                    </div>
                  </div>
                </div>
              </td>
              <td
                class="px-6 py-4 text-sm leading-5 text-gray-500
                whitespace-no-wrap border-b border-gray-200"
              >
                {item.dob === null ? 'Date of brith' : item.dob}
              </td>
              <td
                class="px-6 py-4 text-sm leading-5 text-gray-500
                whitespace-no-wrap border-b border-gray-200"
              >
                {item.gender === '' ? 'Gender' : item.gender}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="text-sm leading-5 text-gray-500">
                  {item.branch === '' ? 'No branch' : item.branch}
                </div>
                <div class="text-sm leading-5 text-gray-500">
                  {item.role === undefined ? 'Member' : item.role}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="text-sm leading-5 text-gray-500">
                  {item.maritalStatus === '' ? 'Single' : item.maritalStatus}
                </div>
                <div class="text-sm leading-5 text-gray-500">
                  {item.childCount === undefined ? 'No children' : Number.parseInt(item.childCount) === 1 ? '1 child' : `${item.childCount} children`}
                </div>
              </td>

              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-right
                whitespace-no-wrap border-b border-gray-200"
              >
                <button
                  class="text-indigo-600 hover:text-indigo-900"
                  on:click="{() => {
                    push(`/members/false/${item._id}`);
                    currentItem.set(item);
                  }}"
                >
                  Edit
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
