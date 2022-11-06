<template>



<section class="text-gray-700 body-font overflow-hidden bg-white">
  <div class="container px-5 -py-24 mx-auto">

    <div class="flex items-center pb-5 border-b-2 border-gray-200 mb-5">
      <div class="flex items-center text-2xl">
        <span class="mr-3 ">Create Episode</span>
      </div>
    </div>
    
    <form @submit.prevent="saveEpisode()">
      <div class="mb-6">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Episode name</label>
        <input type="text" v-model="episode.name" maxlength="50" minlength="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ชื่อตอน" required="">
      </div>
      <div class="mb-6">
        <label for="detail" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Detail</label>
        <textarea name="" id="" cols="100" rows="10" v-model="episode.detail" minlength="50"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="รายละเอียด" > </textarea>
      </div>

      <div class="m-4" hidden>
        <label for="user_id"> user_id </label>
        <input type="number" v-model="episode.novel_id" >
      </div>

      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>


    </form>

    <div v-if=" loadss == null" role="status">
        <svg class="block w-32 h-32 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>

    <!-- <div class="lg:w-4/5 mx-auto flex flex-wrap">

      <div class="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

        <div class="well"></div>

      </div>

    </div> -->
  

  </div>
</section>

</template>

<script>
export default {
  data() {
    return {
      episode : {
        name : "",
        detail : "",
        novel_id : this.$route.params.id
      },
      loadss : 1
    }
  },
  methods: {
    async saveEpisode(){
      this.loadss = null
      try {
        const response = await this.$axios.post('/novels/episodes' , this.episode)
        if (response.status === 201){
          let episode_id = response.data.episode_id
          //this.$router.push(`novels/${novel.id}`)
          this.$router.push({name: 'episodes.show', params: {id: episode_id}})
          //this.$router.push(`/novels/${novel_id}`)
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