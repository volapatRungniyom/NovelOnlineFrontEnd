<template>
      <div v-if="auth && auth.email" class="font-bold">
        <img v-if="auth.image_path" class="w-20 h-20 mb-10 -ml-20 mr-8 mt-6  inline-block  rounded-full dark:bg-gray-500 aspect-square" :src="`http://localhost/storage/image/${auth.image_path}`" />
        <img v-else class="w-20 h-20 mb-10 -ml-20 mr-8 mt-6  inline-block  rounded-full dark:bg-gray-500 aspect-square" src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png" />
        <router-link to="/MyProfile" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {{ auth.name }}
        </router-link>
        <router-link to="/logout" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Logout</router-link>
      </div>
      <div v-else>
        <router-link to="/login" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Login</router-link>or
        <RouterLink to="/register" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Register</RouterLink>
      </div>



</template>
<script>
import { useAuthStore } from '@/stores/auth.js'
export default {
  setup() {
    const auth_store = useAuthStore()
    return { auth_store }
  },
  data() {
    return {
      auth: null
    }
  },
  watch: {
      auth_store: {
          immediate: true,
          deep: true,
          handler(newValue, oldValue) {
            console.log(newValue.getAuth)
            this.auth = this.auth_store.getAuth
          }
      }
  },
  mounted() {
    if (this.auth_store.isAuthen) {
      this.auth = this.auth_store.getAuth
    } else {
      this.auth = null
    }
  }
}
</script>