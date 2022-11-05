<template>


  <div class="p-10">
    <div @click="ShowNovel(novel)"
        class="object-contain h-auto w-auto max-w-sm rounded overflow-hidden shadow-lg cursor-pointer ">
      <img class="object-fill h-96 w-96 hover:scale-125 ease-in duration-300" :src="`http://localhost/storage/image/${novel.image}`" >
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ novel.name}}</div>
          <p class="text-gray-700 text-base truncate w-50">
            {{novel.detail}}
          </p>
        <svg
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline-block mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {{novel.view}}

      </div>

      <div class="px-6 pt-4 pb-2 h-24">
        <span v-for=" tag in novel.tags" :key = "tag.id" class="inline-block bg-gray-200 rounded-full
        px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #{{ tag.name }}
        </span>
      </div>
    </div>
  </div>

</template>


<script>
export default {
  props: {
    novel: Object,
    url: {
      type: String,
      default: ''
    }
  },
  methods:{
    ShowNovel(novel){
      this.$router.push(`/novels/${novel.id}`)
    }
  }
}
</script>

<style>

</style>