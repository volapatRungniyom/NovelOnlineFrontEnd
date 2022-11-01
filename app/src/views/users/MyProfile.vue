<template>
  <div v-if="auth">
  <div class="p-16">
    <div class="p-8 bg-white shadow mt-24">
      <div class="grid grid-cols-1 md:grid-cols-3">
        <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
        </div>
        <div class="relative">
          <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
            <img class="  rounded-full dark:bg-gray-500 aspect-square" :src="`http://localhost/storage/image/${auth.image_path}`" />
          </div>
        </div>

        <div class="space-x-8 flex justify-between ">
          <div v-if="change">

          <div class="m-4">
            <label for="name">name </label>
            <input type="text" v-model="user.name">
          </div>

          <div class="m-4">
            <label for="name">email </label>
            <input type="text" v-model="user.email">
          </div>

            <div class="col-md-6 m-3">
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="customFile"
                       ref="file" @change="handleFileObject()">
                <label class="custom-file-label text-left" for="customFile"></label>
              </div>
            </div>

            <button
                class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                @click="editProfile()"
            >
              change avatar
            </button>

            <button
                class="text-white py-2 ml-2 px-4 uppercase rounded bg-red-400 hover:bg-red-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                @click="changec()"
            >
              cancel
            </button>

        </div>
          <div v-if="!change">

          <button
              class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              @click="changec()"
          >
            edit
          </button>
          </div>
        </div>
      </div>

      <div class="mt-20 text-center pb-12">
        <h1 class="text-4xl font-medium text-gray-700"> {{auth.name}} </h1>
        <p class="font-light text-gray-600 mt-3">{{auth.email}}</p>
        <div class="inline-block">
          <p class="text-gray-400 inline-block">Novel</p>
          <p class="text-gray-400 inline-block ml-10">Follower</p>
          <div>
            <p class="font-bold text-gray-700 text-xl inline-block">{{ count }}</p>
            <p class="font-bold text-gray-700 text-xl inline-block ml-20">{{ auth.followers }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <p class="font-bold text-gray-700 text-2xl text-center mb-10">My Novel</p>


    <div class="grid grid-cols-3 gap-4  mb-20">
      <NovelCard v-for="libary in auth.author"
                 :key = "libary.id"
                 :novel = "libary"
      >

      </NovelCard>
      <div v-if="!auth.author.length" class="items-center">
        <p class="font-bold text-gray-700 text-2xl text-center ">No My Novel</p>
      </div>
    </div>

    <p class="font-bold text-gray-700 text-2xl text-center border-t-2 ">My Following</p>
    <div class="grid grid-cols-5 ml-20 mt-10 mb-10 mr-20 ">
      <div v-for="following in auth.following"
                 :key = "following.id"
      >

        <div @click="ShowUser(following)" class="cursor-pointer" >
          <img class="w-28 h-28 inline-block mr-2 rounded-full dark:bg-gray-500 aspect-square"
               :src="`http://localhost/storage/image/${following.image_path}`" />
          <h1 class="text-4xl font-medium text-gray-700"> {{following.name}} </h1>
        </div>
      </div>
    </div>
    <div v-if="!auth.following.length" class="items-center">
      <p class="font-bold text-gray-700 text-2xl text-center ">No Following</p>
    </div>


  </div>
</template>

<script>
import NovelCard from '@/components/novels/NovelCard.vue'
import PopupEdit from '@/components/novels/PopupEdit.vue'
import { useAuthStore } from '@/stores/auth.js'

export default {
  setup() {
    const auth_store = useAuthStore()
    return { auth_store }
  },
  data() {
    return {
      auth : {
        name : '',
        email : ''
      },
      count : 0,
      image : null,
      change : false,
      user : {
        name : '',
        email : ''
      }
    }
  },
  async created() {
    if (this.auth_store.isAuthen) {
      await this.auth_store.fetch()
      this.auth = this.auth_store.getAuth
      this.user.name = this.auth.name
      this.user.email = this.auth.email
      this.count = this.auth.author.length

    } else {
      this.auth = null
    }
  },
  components: {
    NovelCard,PopupEdit
  },
  methods : {
    handleFileObject(){
      this.image = this.$refs.file.files[0];
    },
    async editProfile(){
      let profile = new FormData()
      if (this.image){
        profile.append('image', this.image);
      }
      profile.append('name', this.user.name);
      profile.append('email', this.user.email);

      try {
          const response = await this.$axios.post(`/updateProfile/${this.auth.id}` , profile,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }})
          if (response.status === 200){
            await this.auth_store.fetch()
            this.auth = this.auth_store.getAuth
            this.user.name = this.auth.name
            this.user.email = this.auth.email
            this.change = false
            alert("sucess")
          }
        } catch (error){
          this.error = error.message
          console.log(error)
        }

    },
    changec(){
      if (this.change){
        this.change = false
      }
      else this.change = true
    },
    ShowUser(following){
      this.$router.push(`/UserProfile/${following.id}`)
    }
  }
}
</script>

<style>

</style>