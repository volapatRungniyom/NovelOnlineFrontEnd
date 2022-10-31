<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import Profile from '@/components/profile/Profile.vue'

</script>

<template >
  <header class="bg-[#49EAEF] mb-5">
    <nav class="relative flex flex-wrap items-center justify-between ">
      <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
          <a class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="#pablo">
            <Profile></Profile>
          </a>
          <button class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
            <span class="block relative w-6 h-px rounded-sm bg-white"></span>
            <span class="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
            <span class="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
          </button>
        </div>
        <div class="lg:flex flex-grow items-center" id="example-navbar-warning">
          <ul class="flex flex-col lg:flex-row list-none ml-auto">
            <li class="nav-item">
              <RouterLink to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/novels">Novels</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/createNovel">Create Novel</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/Library">Library</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/MyNovels">MyNovels</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  </header>

  <RouterView />
</template>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
