<template>

  <div class="p-16">
    <div class="p-8 bg-white shadow mt-24">
      <div class="grid grid-cols-1 md:grid-cols-3">
        <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
        </div>
        <div class="relative mb-10">
          <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
            <img class=" rounded-full dark:bg-gray-500 aspect-square" :src="`http://localhost/storage/image/${user.image_path}`" />
          </div>
        </div>

        <div v-if="auth">
          <div v-for="following in auth.following"
               :key = "following.id" >
            <div v-if="following.id+'' === $route.params.id+''" hidden>
              <div>{{ check = true }}</div>
            </div>
          </div>
        </div>

          <div class="space-x-8 flex justify-between ">
            <div v-if="auth">
              <div v-if="auth.id !== user.id">
                <div v-if="check" >
                  <button id="follow"
                          class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                          @click="Follower()"
                  >
                    FOLLOWING
                  </button>
                </div>
                <div v-else>
                  <button id="follow"
                          class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                          @click="Follower()"
                  >
                    FOLLOWER
                  </button>
                </div>
            </div>
          </div>
          </div>
        </div>

        <div class="mt-20 text-center pb-12 ">
          <h1 class="text-4xl font-medium text-gray-700"> {{user.name}} </h1>
          <p class="font-light text-gray-600 mt-3">{{user.email}}</p>
            <div class="inline-block">
              <p class="text-gray-400 inline-block">Novel</p>
              <p class="text-gray-400 inline-block ml-10">Follower</p>
              <div>
                <p class="font-bold text-gray-700 text-xl inline-block">{{ count }}</p>
                <p class="font-bold text-gray-700 text-xl inline-block ml-20">{{ user.followers }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    <p class="font-bold text-gray-700 text-2xl text-center ">{{user.name}} Novel</p>


    <div class="grid grid-cols-3 gap-4">
      <NovelCard v-for="author in user.author"
                 :key = "author.id"
                 :novel = "author"
      >

      </NovelCard>
    </div>
</template>

<script>
import NovelCard from '@/components/novels/NovelCard.vue'
import { useAuthStore } from '@/stores/auth.js'

export default {
  setup() {
    const auth_store = useAuthStore()
    return { auth_store }
  },
  data() {
    return {
      user : {},
      count : 0,
      image : null,
      change : false,
      auth : {},
      follow : {
        follower_id : 1
      },
      check : false
    }
  },
  async created() {
    const id = this.$route.params.id
    try {
      const response = await this.$axios.get(`/users/${id}`)
      if (response.status === 200){
        this.user = response.data.data
        this.count = this.user.author.length

      }
    }catch (error){
      console.log(error)
      this.error = error.message
    }

    if (this.auth_store.isAuthen) {
      await this.auth_store.fetch()
      this.auth = this.auth_store.getAuth
    } else {
      this.auth = null
    }
  },
  components: {
    NovelCard
  },
  methods : {
    async Follower(){
      this.follow.follower_id = this.user.id
      try {
        const response = await this.$axios.put(`/users/${this.auth.id}`,this.follow)
        if (response.status === 200){
          await this.auth_store.fetch()
          if (document.getElementById("follow").innerText.toString() === "FOLLOWING" ){
            document.getElementById("follow").innerText = "FOLLOWER";
            this.user.followers -= 1
          }
          else {
            document.getElementById("follow").innerText = "FOLLOWING";
            this.user.followers += 1
          }

        }
      } catch (error){
        this.error = error.message
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>