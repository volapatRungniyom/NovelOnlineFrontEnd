import { defineStore } from 'pinia'
import { authAPI } from '@/services/api'

const auth_storage = {
  id: localStorage.getItem('auth.id'), //**
  email: localStorage.getItem('auth.email'),
  point: localStorage.getItem('auth.point'),
  libary: localStorage.getItem('auth.libary'),
  author: localStorage.getItem('auth.author')
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => {
    return {
      auth: {
        id:auth_storage.id,
        email: auth_storage.email,
        point: auth_storage.point,
        libary: auth_storage.libary,
        author: auth_storage.author
      }
    }
  },

  getters: {
    getAuth: (state) => state.auth,

    getEmail: (state) => state.auth.email,

    getPoint: (state) => state.auth.point,

    getId: (state) => state.auth.id,

    getLibary: (state) => state.auth.libary,

    getAuthor: (state) => state.auth.author,


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
      localStorage.setItem('auth.email', this.auth.email)
      localStorage.setItem('auth.point', this.auth.point)
      localStorage.setItem('auth.libary', this.auth.libary)
      localStorage.setItem('auth.author', this.auth.author)

    },

    logout () {
      authAPI.logout()
      localStorage.removeItem('auth.id')
      localStorage.removeItem('auth.email')
      localStorage.removeItem('auth.point')
      localStorage.removeItem('auth.libary')
      localStorage.removeItem('auth.author')

      this.auth = {
        email: null,
        point: null,
        id: null
      }
    }
  }
})