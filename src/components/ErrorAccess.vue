<template>
  <div class="bg-red mx-auto mt-12 text-center max-h-screen">
    <div class="mx-auto max-w-screen-xl">
      <div class="flex flex-col pt-20">
        <div class="flex flex-col justify-between mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-20 w-20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div
          class="text-gray-700 font-extrabold text-center text-xl sm:text-3xl pt-8"
        >
          Not Authorized
        </div>
        <div class="flex flex-col pt-4">
          <div
            class="pb-4 text-gray-700 font-normal text-center text-xl sm:text-3x"
          >
            You don't have permission to view this content. Please contact your
            administrator.
          </div>
        </div>
        <div class="h-24" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "ErrorAccess"
};
</script>
