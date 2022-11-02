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
      <div v-if="user.pivot.is_owner === 1 && auth.id === user.id ">
        {{ is_author = true }}
      </div>
    </div>
    </div>

    <div v-if="auth">
        <div v-if="is_author">
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


    <div v-if="novel.comments" class="well" >
      <h1>Comment</h1>
      <div v-if="auth">
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

      <div v-for=" comment in data" >
        <div class="p-4 mb-d border-2 border-green-800 rounded-lg m-4 ">
          <div class="text-3xl">
            {{ comment }}
          </div>
        </div>
      </div>
    </div>


  </div>

</template>

<script >
import { useAuthStore } from '@/stores/auth.js'
import { tagAPI } from '@/services/api.js'

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
        novel_id : this.$route.params.id
      },
      is_author : false,
      tags : {},
      tagshow : [],
      selected : null,
      novelTag : {
        novel_id : 1
      }
    }
  },
  async created() {
    const id = this.$route.params.id
    try {
      const response = await this.$axios.get(`/novels/${id}`)
      this.tags = await tagAPI.getAll()
      this.selected = this.tags[0]

      if (response.status === 200){
        this.novel = response.data.data
        this.novelTag.novel_id = this.novel.id
        this.loadss = 0
        for (var i in this.novel.comments){
          this.data.push(this.novel.comments[i].message)
        }

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
      try {
        const response = await this.$axios.post(`/commentNovels`,this.comment)
        if (response.status === 201){
          this.data.push(this.comment.message)
        }
      }catch (error){
        this.error = error.message
        console.log(error)
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
    }
  }
}
</script>
