<template>

  <div class="flex justify-center relative top-1/3 ">
    <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg w-full mx-20 ">
      <div class="relative flex gap-4">
        <img class="w-10 h-10 inline-block mr-2 rounded-full dark:bg-gray-500 aspect-square"
             :src="`http://localhost/storage/image/${image_path}`" />        <div class="flex flex-col w-full">
        <div class="flex flex-row justify-between">
          <p class="relative text-3xl whitespace-nowrap truncate overflow-hidden">{{name}}
          </p>
          <a class="text-gray-500 text-xl" href="#"><i class="fa-solid fa-trash"></i></a>
        </div>
        <p class="text-gray-400 text-sm">{{ adddate(created_at) }}</p>
      </div>
      </div>
      <p class="-mt-4 text-2xl text-gray-500 text-clip break-words w-85 whitespace-pre-wrap">{{ message }}</p>
    </div>
  </div>

</template>


<script>
export default {
  props: {
    image_path: '',
    name: '',
    created_at: '',
    message : ''
  },
  methods:{
    adddate(date){
      let currDateLocal = new Date(date).toLocaleString('en-US', {
        timeZone: 'Asia/Bangkok',
      });
      return currDateLocal
    }
  }
}
</script>

<style>

</style>