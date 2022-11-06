<template>

  <section class="h-screen">
    <div class="container px-6 py-12 h-full">
      <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
        <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
          <img
            src="https://80000hours.org/wp-content/uploads/2022/06/open-book-256x256-1.png"
            class="ml-auto w-96 h-96"
            alt=""
          />
        </div>
  
        <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
          <div v-if="error">
            {{ error }}
          </div>
          <form @submit.prevent="onFormSubmit()">
            <!-- Email input -->
            <div class="mb-6">
              <input
                type="email" v-model="email" required autocomplete="off"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Email address"
              />
            </div>
  
            <!-- Password input -->
            <div class="mb-6">
              <input
                type="password" v-model="password" required
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Password"
              />
            </div>
  
            <!-- <div class="flex justify-between items-center mb-6">
              <div class="form-group form-check">
                <input
                  type="checkbox"
                  class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  id="exampleCheck3"
                  checked
                />
                <label class="form-check-label inline-block text-gray-800" for="exampleCheck2"
                  >Remember me</label
                >
              </div>

            </div> -->
  
            <!-- Submit button -->
            <button
              type="submit"  :disabled="disabledButton"
              class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Sign in
            </button>
  
  
   
          </form>
        </div>
      </div>
    </div>
  </section>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
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
        email: '',
        password: '',
        error: null,
        disabledButton: false
      }
    },
    methods: {
      async onFormSubmit() {
        this.error = null
        this.disabledButton = true
        try {
          if (await this.auth_store.login(this.email, this.password)) {
            this.$router.push('/')
          } else {
            this.disabledButton = false
          }
        } catch (error) {
          this.error = error.message
          this.disabledButton = false
        }
      }
    },
  }
  </script>