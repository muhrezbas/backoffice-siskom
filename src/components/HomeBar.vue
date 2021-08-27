<template>
  <nav
    class="homeBar flex items-center justify-between flex-wrap bg-white py-4 px-8 xl:px-24"
  >
    <div class="flex items-center flex-no-shrink text-white mr-6">
      <img src="../assets/logo160.png" class="h-12" />
      <!-- <div class="text-white font-extrabold text-center text-xl sm:text-2xl">
        Siskom
      </div> -->
    </div>
    <div class="block sm:hidden">
      <button
        @click="toggle"
        class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-gray-700 hover:border-gray-700"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div
      :class="open ? 'block' : 'hidden'"
      class="w-full flex-grow sm:flex sm:items-center sm:w-auto"
    >
      <div class="text-sm sm:flex-grow"></div>
      <span class="px-1 sm:px-3" />
      <div>
        <button
<<<<<<< HEAD
          @click="$router.push('/admin/login')"
          class="font-bold text-white hover:text-red-700 py-1 rounded-md transition duration-500 ease select-none hover:bg-gray-200 focus:outline-none focus:shadow-outline"
=======
          @click="$router.push('/login')"
          class="font-bold hover:text-red-700 py-1 rounded-md transition duration-500 ease select-none hover:bg-gray-200 focus:outline-none focus:shadow-outline"
>>>>>>> 573d8b4f1b0747af3b21ee0e04d29797112a5ec5
        >
          <span class="px-3">Log In</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<style>
@media screen and (min-width: 1280px) {
  .homeBar {
    margin-top: -3.5rem !important;
    margin-left: -15rem !important;
  }
}
.homeBar {
  margin-top: -3.5rem !important;
  margin-left: 0;
}
</style>
