<template>
  <h1 class="text-center text-6xl">
    Libary
  </h1>
  <div class="grid grid-cols-3 gap-4">
    <NovelCard v-for="libary in auth.libary"
               :key = "libary.id"
               :novel = "libary"
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
      auth : {}
    }
  },
  async created() {
    await this.auth_store.fetch()
    if (this.auth_store.isAuthen) {
      this.auth = this.auth_store.getAuth

    } else {
      this.auth = null
    }
  },
  components: {
    NovelCard
  }
}
</script>

<style>

</style>