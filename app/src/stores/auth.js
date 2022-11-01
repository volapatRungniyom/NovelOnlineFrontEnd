import { defineStore } from 'pinia'
import { authAPI } from '@/services/api'

const auth_storage = {
  id: localStorage.getItem('auth.id'), //**
  name: localStorage.getItem('auth.name'),
  image_path: localStorage.getItem('auth.image_path'),
  email: localStorage.getItem('auth.email'),
  point: localStorage.getItem('auth.point'),
  libary: localStorage.getItem('auth.libary'),
  author: localStorage.getItem('auth.author'),
  following: localStorage.getItem('auth.following'),
  followers: localStorage.getItem('auth.followers')

}

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => {
    return {
      auth: {
        id:auth_storage.id,
        name:auth_storage.name,
        image_path:auth_storage.image_path,
        email: auth_storage.email,
        point: auth_storage.point,
        libary: auth_storage.libary,
        author: auth_storage.author,
        following: auth_storage.following,
        followers: auth_storage.followers
      }
    }
  },

  getters: {
    getAuth: (state) => state.auth,

    getEmail: (state) => state.auth.email,

    getPoint: (state) => state.auth.point,

    getId: (state) => state.auth.id,

    getName: (state) => state.auth.name,

    getLibary: (state) => state.auth.libary,

    getAuthor: (state) => state.auth.author,

    getImage: (state) => state.auth.image_path,

    getFollowing: (state) => state.auth.following,

    getFollower: (state) => state.auth.followers,


    isAuthen (state) {
      return state.auth.email != null
    }
  },

  actions: {
    async login (id,email, password) {
      if (await authAPI.login(id,email, password)) {
        this.fetch()
        return true
      }
      return false
    },

    async fetch () {
      this.auth = await authAPI.me()
      localStorage.setItem('auth.id', this.auth.id)
      localStorage.setItem('auth.name', this.auth.name)
      localStorage.setItem('auth.email', this.auth.email)
      localStorage.setItem('auth.point', this.auth.point)
      localStorage.setItem('auth.libary', this.auth.libary)
      localStorage.setItem('auth.author', this.auth.author)
      localStorage.setItem('auth.image_path', this.auth.image_path)
      localStorage.setItem('auth.following', this.auth.following)
      localStorage.setItem('auth.followers', this.auth.followers)


    },

    logout () {
      authAPI.logout()
      localStorage.removeItem('auth.id')
      localStorage.removeItem('auth.name')
      localStorage.removeItem('auth.email')
      localStorage.removeItem('auth.point')
      localStorage.removeItem('auth.libary')
      localStorage.removeItem('auth.author')
      localStorage.removeItem('auth.image_path')
      localStorage.removeItem('auth.following')
      localStorage.removeItem('auth.followers')

      this.auth = {
        email: null,
        point: null,
        id: null,
        name: null,
        libary: null,
        author: null,
        image_path: null,
        following: null,
        followers: null

      }
    }
  }
})