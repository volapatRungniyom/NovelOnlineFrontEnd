<template>

  <div v-if="tags == null" role="status">
    <svg class="block w-32 h-32 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
  </div>
  
  <div v-if="auth">
  <div v-if="auth.role === 'admin'">
    <form @submit.prevent="createTag(tag)">
      <div class=" ml-10 mt-10 w-96 inline-block">
        <input
            type="text" v-model="tag.name" maxlength="10" minlength="4"  required autocomplete="off"
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Name"
        />
      </div>
      <button type="submit"
              class="inline-block w-auto px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
      >
        create Tag
      </button>
    </form>
  </div>
  </div> 

  <div class="md:flex md:justify-center ">
    <div class="grid grid-cols-6 gap-4 mt-10 ">
         <div v-for=" tag in tags" :key = "tag.id" class="inline-block bg-gray-200 rounded-full
       px-3 py-1 text-2xl font-semibold text-gray-700 mr-2 mb-2 ">
           <div class="cursor-pointer truncate" @click="TagShow(tag.id)">
             #{{ tag.name }}
           </div>
      </div>
    </div>
  </div>

</template>

<script>
import { tagAPI } from '@/services/api.js'
import { useAuthStore } from '@/stores/auth.js'

export default {
  setup() {
    const auth_store = useAuthStore()
    return { auth_store }

  },
  data() {
    return {
      selected:null,
      tags: null,
      tag: {
        name : ''
      },
      auth : {},
      data : []
    }
  },
  async created() {
    try {
      this.tags = await tagAPI.getAll()
      for (let x in this.tags){
        this.data.push(this.tags[x].name)
      }

    }catch (error){
      console.error(error.message)
      this.selected = error.message
    }
    if (this.auth_store.isAuthen) {
      await this.auth_store.fetch()
      this.auth = this.auth_store.getAuth
    } else {
      this.auth = null
    }
  },
  methods : {
    TagShow(tag){
      this.$router.push(`/tags/${tag}`)
    },
    async createTag(tag){
      tag.name = tag.name.trim()
      if (this.data.includes(tag.name)){
        alert('tag has been used')
      }
      else {
        const response = await tagAPI.saveNew(tag)
        alert('add tag sucess')
        this.$router.push('/tags')
      }
    }
  }
}
</script>

<style>

</style>