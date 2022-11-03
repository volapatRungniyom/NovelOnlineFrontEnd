<template>


  <div class="p-10" >
    <div @click="ShowNovel(novel)"
        class="object-contain h-auto w-auto max-w-sm rounded overflow-hidden shadow-lg cursor-pointer hover:scale-125 ease-in duration-300">
      <img class="object-fill h-96 w-96 " :src="`http://localhost/storage/image/${novel.image}`" >
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ novel.name}}</div>
          <p class="text-gray-700 text-base truncate w-50">
            {{novel.detail}}
          </p>
      </div>
      <div class="px-6 pt-4 pb-2">
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