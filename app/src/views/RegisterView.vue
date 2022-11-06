<template>
<section class="h-screen">
    <div class="container px-6 py-12 h-full">
      <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
        <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            class="w-full"
            alt="Phone image"
          />
        </div>

        <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
          <div v-if="error" class="text-red-400 text-2xl text-center">
            {{ error }}
          </div>
          <form @submit.prevent="createUser()">
            <!-- Name input -->
            <div class="mb-6">
              <input
                type="text" v-model="user.name" maxlength="10" minlength="5"  required autocomplete="off" 
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Name"
              />
            </div>
            <!-- Email input -->
            <div class="mb-6">
              <input
                type="email" v-model="user.email" required autocomplete="off"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Email address"
              />
            </div>
  
            <!-- Password input -->
            <div class="mb-6">
              <input
                type="password" v-model="user.password" required
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Password"
              />
            </div>

            <!-- Profile Image -->
            <label class="col-md-4 col-form-label text-md-right">Profile Image</label>
            <div class="col-md-6 mb-7">
            <div class="custom-file">
            <!-- MOST IMPORTANT - SEE "ref" AND "@change" PROPERTIES -->
            <input type="file" class="custom-file-input" id="customFile"
               ref="file" @change="handleFileObject()">
            <label label class="custom-file-label text-left" for="customFile"></label>
            </div>
            </div>
  
            <!-- Submit button -->
            <button
              type="submit"  :disabled="disabledButton"
              class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              register
            </button>

          </form>
        </div>
      </div>
    </div>
  </section>
  <div class="m-8">
    <div v-if=" loadss == null" role="status">
      <svg class="block w-32 h-32 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user : {
        name : "",
        email : "",
        password : ""
      },
      loadss : 1,
      image : null
    }
  },
  methods: {
    async createUser(){
      this.loadss = null
      let user = new FormData()
      user.append('image', this.image);
      user.append('name', this.user.name)
      user.append('email', this.user.email)
      user.append('password', this.user.password)
      try {
        const response = await this.$axios.post('/users' ,  user,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }})
        if (response.status === 201){
          this.$router.push('/login')
        }
      } catch (error){
        this.error = "email has been used"
        this.loadss = 1
        console.log(error)
      }
    },
    handleFileObject(){
      this.image = this.$refs.file.files[0];
    }
  }
}
</script>

<style>

</style>