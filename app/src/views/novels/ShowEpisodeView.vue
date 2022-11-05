<template>

  <div v-if="episode == null" role="status">
    <svg class="block w-32 h-32 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
  </div>
  <div class="inline-flex bg-blu-300 mt-10" @click="check">
    <RouterLink :to="{name: 'episodes.show', params: { id: episode.prev }} "
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r ml-2" v-if="episode.prev != null">
      Prev
    </RouterLink>

    <RouterLink :to="{name: 'novels.show', params: { id: episode.novel_id }} "
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r ml-2">
      index
    </RouterLink>

    <RouterLink :to="{name: 'episodes.show', params: { id: episode.next }} "
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r ml-2" v-if="episode.next != null">
      next
    </RouterLink>
  </div>


  <section class="text-gray-700 body-font overflow-hidden bg-gra-500">
    <div class="container px-5 py-24 mx-auto bg-gra-400">
      <div class="mx-auto flex flex-wrap bg-white">
        <div class="">
          <!-- <div class="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"> -->

          <!-- <p class="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p> -->

          <div v-if="episode">
            <div class="text-center mb-5 font-bold text-3xl">
              <!-- {{episode.name}} -->
              <p class="leading-relaxed">{{episode.name}}</p>

            </div>

            <div class="font-sans whitespace-pre-wrap">
              <p @click.right.prevent @keydown="keydown" @copy.prevent @paste.prevent 
              class="text-xl">{{episode.detail}}</p>

            </div>
          </div>
          <div v-else>
            <div role="status">
              <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


  <div class="inline-flex" @click="check">
    <RouterLink :to="{name: 'episodes.show', params: { id: episode.prev }} "
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r ml-2" v-if="episode.prev != null">
      Prev
    </RouterLink>

    <RouterLink :to="{name: 'novels.show', params: { id: episode.novel_id }} "
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r ml-2">
      index
    </RouterLink>

    <RouterLink :to="{name: 'episodes.show', params: { id: episode.next }} "
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r ml-2" v-if="episode.next != null">
      next
    </RouterLink>
  </div>




  <section class="text-gray-700 body-font overflow-hidden bg-white">
  <div class="container px-5 -py-24 mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">

      <div class="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

        <div class="well"></div>

        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
            <div class="flex ml-6 items-center">
              <span class="mr-3 mt-20">ความคิดเห็น</span>
            </div>
        </div>

        <div class="">
          <div v-if="auth" class="mb-10">
          
            <div class="m-4">
              <label for="detail">  </label>
              <textarea class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="" id="" cols="100" rows="10" v-model="comments.message"
              placeholder="ข้อความของคุณ" > </textarea>
            </div>
            <button v-on:click="AddComment()" class="w-full items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              AddComment
            </button>

            <!--  -->
          </div>

          <div v-else>
            <p class="text-2xl"> please login to comment</p>
          </div>
        </div>

        <div class="">


          <comment v-for="NewComment in data"
             :image_path = "auth.image_path"
             :name = "auth.name"
             :created_at = "getTime()"
             :message = "NewComment"
          >
          </comment>


          <comment v-for="comment in commentshow"
           :key="comment.id"
           :image_path = "comment.user.image_path"
           :name = "comment.user.name"
           :created_at = "comment.created_at"
           :message = "comment.message"
          >
          </comment>
        </div>


      </div>


    

    </div>
    

  </div>
</section>





  <!-- <h1>Comment</h1>
  <div v-if="auth" class="mb-10">
    <div class="m-4">
      <label for="detail"> message </label>
      <textarea name="" id="" cols="100" rows="10" v-model="comments.message"> </textarea>
    </div>
    <button v-on:click="AddComment()" class="bg-gray-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded-r ml-2">
      AddComment
    </button>

    <comment v-for="NewComment in data"
             :image_path = "auth.image_path"
             :name = "auth.name"
             :created_at = "getTime()"
             :message = "NewComment"
    >
    </comment>
  </div>

  <div v-else>
    <p class="text-2xl"> please login to comment</p>
  </div>
  <comment v-for="comment in commentshow"
           :key="comment.id"
           :image_path = "comment.user.image_path"
           :name = "comment.user.name"
           :created_at = "comment.created_at"
           :message = "comment.message"
  >
  </comment> -->

</template>

<script>
import Comment from '@/components/novels/Comment.vue'
import { useAuthStore } from '@/stores/auth.js'
import { commentEpisodelAPI } from '@/services/api.js'
import { EpisodelAPI } from '@/services/api.js'



export default {
  setup() {
    const auth_store = useAuthStore()
    return { auth_store }
  },
  data () {
    return {
      error : null,
      episode : {},
      messsage : null,
      comments : {
        messsage : '',
        episode_id : this.$route.params.id,
        user_id : 1
      },
      data: [],
      commentshow : {},
      auth: {},
      episodeUser: {
        user_id : 1
      }
    }
  },
  async created() {
    const id = this.$route.params.id
    try {
      const response = await this.$axios.get(`/novels/episodes/${id}`)
      if (response.status === 200){
        this.episode = response.data.data
        this.commentshow = await commentEpisodelAPI.getComment(id)
      }
    }catch (error){
      console.log(error)
      this.error = error.message
    }
    if (this.auth_store.isAuthen) {
      await this.auth_store.fetch()
      this.auth = this.auth_store.getAuth
      this.comments.user_id = this.auth.id
      this.episodeUser.user_id = this.auth.id
      await EpisodelAPI.getUser(id,this.episodeUser)

    }else {
      this.auth = null
    }
  },
  watch : {
    async '$route' (to, from) {
      const id = this.$route.params.id
      this.data = []
      this.commentshow = {}
      try {
        const response = await this.$axios.get(`/novels/episodes/${id}`)
        if (response.status === 200){
          this.episode = response.data.data
          this.commentshow = await commentEpisodelAPI.getComment(id)
        }
      }catch (error){
        console.log(error)
        this.error = error.message
      }
      if (this.auth_store.isAuthen) {
        await this.auth_store.fetch()
        this.auth = this.auth_store.getAuth
        this.comments.user_id = this.auth.id
        this.episodeUser.user_id = this.auth.id
        await EpisodelAPI.getUser(id,this.episodeUser)

      }else {
        this.auth = null
      }
    }

  },methods : {
    check(){
      this.messsage = 1
    },
    keydown: function(e) {
      console.log(e)
    },
    async AddComment(){
      this.comments.episode_id = this.$route.params.id
      try {
        const response = await this.$axios.post(`/commentEpisodes`,this.comments)
        if (response.status === 201){
          this.data.unshift(this.comments.message)
          this.comments.message = ""
        }
      }catch (error){
        this.error = error.message
        console.log(error)
      }
   },
    getTime(){
      const today = new Date().toISOString()
      return today
    }
  },
  components :{
    Comment
  }
}
</script>

<style>

</style>