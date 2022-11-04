<template >
  <div class="m-5">
    <div class="border-2  w-96 bg-gray-100">
      <img class="object-fill h-96 w-96" :src="`http://localhost/storage/image/${novel.image}`" >
    </div>

    <div class="text-4xl m-4">
      {{ novel.name }}
    </div>

    <div class="px-2 pt-4 pb-2">
      <div v-for=" user in novel.user" :key = "user.id" >
        <div v-if="user.pivot.is_owner === 1">
          <div @click="ShowUser(user)" class="cursor-pointer" >
              <img class="w-10 h-10 inline-block mr-2 rounded-full dark:bg-gray-500 aspect-square"
                   :src="`http://localhost/storage/image/${user.image_path}`" />
              <h1 class="text-3xl inline-block">
                {{user.name }}
              </h1>
            </div>
        </div>
      </div>

    <div class="text-2xl whitespace-pre-wrap ">
      <div class="px-2 pt-4 pb-2">
        <h1 class="text-4xl ">
          เรื่องย่อ
        </h1>
      </div>
      {{ novel.detail }}
    </div>

      <div v-if="novel.tags" class="well mt-5">
        <span v-for=" tag in tagshow" class="inline-block bg-gray-200 rounded-full
        px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #{{tag}}
        </span>
      </div>
    </div>

    <div v-if="auth">
    <div v-for=" user in novel.user" :key = "user.id" hidden>
      <div v-if="(user.pivot.is_owner === 1 && auth.id === user.id) || auth.role === 'admin' ">
        {{ is_author = true }}
      </div>
    </div>
    </div>

    <div v-if="auth">
        <div v-if="is_author || auth.role === 'admin'">
          <button @click="CreateEpisode()"
                  class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
          >
            Create Episode
         </button>
         <button @click="EditNovel()"
                 class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
         >
           EditNovel
         </button>
          <button @click="deleteNovel()"
                  class="text-white py-2 px-4 uppercase rounded bg-red-400 hover:bg-red-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
          >
            delete Novel
          </button>
          <select class="form-control" v-model="selected" >
            <option v-for="tag in tags" v-bind:value="tag" >{{ tag.name }}</option>
          </select>

          <button @click="addTag()"
                  class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
          >
            add Tag or delete
          </button>
        </div>
    </div>
    <div v-if="auth">
    <div v-if="check" >
        <button @click="updateLibary()" id="myLibrary" value="123" class="px-4 py-2 rounded-lg bg-yellow-400" >
          novel in my library
        </button>
      </div>
      <div v-else>
        <button @click="updateLibary()" id="myLibrary" value="234" class="px-4 py-2 rounded-lg bg-yellow-400">
          add to library
        </button>
      </div>
    </div>

    <div v-if="loadss === 1" role="status">
      <svg class="block w-32 h-32 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span class="sr-only">Loading...</span>
    </div>

    <div v-if="novel.episodes" class="well" >
      Episode
      <div v-for=" episode in novel.episodes" :key="episode.id">
        <div class="p-4 mb-d border-2 border-blue-800 rounded-lg m-4 cursor-pointer" @click="ShowEpisode(episode)">
          <div class="text-3xl">
            {{ episode.name}}-----
            {{ adddate(episode.created_at)}}
          </div>
        </div>
        <div v-if="is_author">
          <button @click="EditEpisode(episode.id)"
                  class="bg-gray-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded-r ml-2" >
            Edit
          </button>
        </div>
      </div>
    </div>



  </div>
  <div v-if="deleteConfirm">
      <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div v-if="loadDeleteConfirm" role="status">
                <svg class="block w-32 h-32 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
              <div v-else>
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Delete novel</h3>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">Are you sure you want to delete your novel? All of your data will be permanently removed. This action cannot be undone.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button @click="deleteNovel()" type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Deactivate</button>
                  <button @click="closePopup()" type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>

    <h1>Comment</h1>
    <div v-if="auth" class="mb-10">
      <div>
        <div class="m-4">
          <label for="detail"> message </label>
          <textarea name="" id="" cols="100" rows="10" v-model="comment.message"> </textarea>
        </div>
        <button v-on:click="AddComment()" class="bg-gray-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded-r ml-2">
          AddComment
        </button>
      </div>
    </div>

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



</template>

<script >
import { useAuthStore } from '@/stores/auth.js'
import { commentNovelAPI } from '@/services/api.js'
import { tagAPI } from '@/services/api.js'
import Comment from '@/components/novels/Comment.vue'
import DeleteConfirm from '@/components/novels/DeleteConfirm.vue'

export default {
  setup() {
    const auth_store = useAuthStore()
    return { auth_store }
  },
  data () {
    return {
      error : null,
      novel : {},
      auth : {},
      check: false,
      loadss : 1,
      id_novel: this.$route.params.id,
      user : {
        user_id : 1
      },
      data : [],
      comment : {
        message : "",
        novel_id : this.$route.params.id,
        user_id : 1
      },
      is_author : false,
      tags : {},
      tagshow : [],
      selected : null,
      novelTag : {
        novel_id : 1
      },
      deleteConfirm : false,
      loadDeleteConfirm : false,
      commentshow : {}
    }
  },
  async created() {
    const id = this.$route.params.id
    try {
      const response = await this.$axios.get(`/novels/${id}`)
      this.tags = await tagAPI.getAll()
      this.commentshow = await commentNovelAPI.getComment(id)
      this.selected = this.tags[0]

      if (response.status === 200){
        this.novel = response.data.data
        this.novelTag.novel_id = this.novel.id
        this.loadss = 0

        for (var a in this.novel.tags){
          this.tagshow.push(this.novel.tags[a].name)
        }

      }
    }catch (error){
      console.log(error)
      this.error = error.message
    }
    if (this.auth_store.isAuthen) {
      await this.auth_store.fetch()
      this.auth = this.auth_store.getAuth
      this.comment.user_id = this.auth.id


      for (var x in this.auth.libary){
        if (this.$route.params.id.toString() === this.auth.libary[x].id.toString()){
          this.check = true
        }
      }

    } else {
      this.auth = null
    }
  },
  methods:{
    ShowEpisode(episode){
      this.$router.push(`/episodes/${episode.id}`)
    },
    CreateEpisode(){
      this.$router.push({name: 'createEpisode.index', params: {id: this.$route.params.id}})
    },
    EditNovel(){
      this.$router.push({name: 'editNovel.edit', params: {id: this.$route.params.id}})
    },
    async updateLibary(){
      this.loadss = null
      this.user.user_id = this.auth.id
      try {
        const response = await this.$axios.put(`/novels/${this.$route.params.id}`,this.user)
        if (response.status === 200){
          await this.auth_store.fetch()
          this.comment.user_id = this.auth.id
          if (document.getElementById("myLibrary").innerText.toString() === "novel in my library"){
            document.getElementById("myLibrary").innerText = "add to library";
          }
          else document.getElementById("myLibrary").innerText = "novel in my library";

          if (this.check === true){
            this.check = false
          }
          else this.check = true
        }
      } catch (error){
        this.error = error.message
        console.log(error)
      }
    },
    EditEpisode(id){
      this.$router.push(`/editEpisode/${id}`)
    },
    async AddComment(){
      if (this.auth_store.isAuthen){
        try {
          const response = await this.$axios.post(`/commentNovels`,this.comment)
          if (response.status === 201){
            this.data.unshift(this.comment.message)
          }
        }catch (error){
          this.error = error.message
          console.log(error)
        }
      }
      else {
        this.$router.push("/login")
        alert("please Login")
      }
    },
    ShowUser(user){
      this.$router.push(`/UserProfile/${user.id}`)
    },
    adddate(date){
      let currDateLocal = new Date(date).toLocaleString('en-US', {
        timeZone: 'Asia/Bangkok',
      });
      return currDateLocal
    },
    async addTag(){
      if (this.tagshow.includes(this.selected.name)){
        let index = this.tagshow.indexOf(this.selected.name);
        this.tagshow.splice(index,1)

      }else {
        this.tagshow.push(this.selected.name)
      }
      const response = await tagAPI.addTagNovel(this.selected.id,this.novelTag)
    },
    async deleteNovel(){
      if (this.deleteConfirm){
        this.loadDeleteConfirm = true
        try {
          const response = await this.$axios.delete(`/novels/${this.$route.params.id}`)
          if (response.status === 200){
            await this.auth_store.fetch()
            this.$router.push('/MyNovels')
          }
        } catch (error){
          this.error = error.message
          console.log(error)
        }
      }
      else {
        this.deleteConfirm = true
      }
    },
    closePopup() {
      this.deleteConfirm = false
    },
    getTime(){
      const today = new Date().toISOString()
      return today
    }

  },
  components: {
    DeleteConfirm,
    Comment
  }
}
</script>
