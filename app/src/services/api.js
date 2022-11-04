import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost/api'
})

const JWT_TOKEN_LOCALSTORAGE_KEY = 'jwt_token'
const token = localStorage.getItem(JWT_TOKEN_LOCALSTORAGE_KEY);

axiosInstance.defaults.headers.common['Accept'] = 'application/json;charset=UTF-8';
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

export const authAPI = {
  async login (email, password) {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password
    })
    if (response.status == 200) {
      localStorage.setItem(JWT_TOKEN_LOCALSTORAGE_KEY, response.data.access_token)
      return true
    }
    return false
  },
  async me () {
    const _token = localStorage.getItem(JWT_TOKEN_LOCALSTORAGE_KEY)
    if (_token) {
      axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + _token
    }
    const response = await axiosInstance.post('/auth/me')
    if (response.status == 200) {
      return response.data.data
    } 
    return {}
  },
  logout () {
    localStorage.removeItem(JWT_TOKEN_LOCALSTORAGE_KEY)
  }
}

export const rewardAPI = {
  async getAll () {
    const response = await axiosInstance.get('/rewards')
    if (response.status == 200) {
      return response.data.data
    }
    return []
  },
  async saveNew (reward) {
    reward.balance = reward.total_amount
    reward.is_active = true
    const response = await axiosInstance.post('/rewards', reward)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  }
}

export const tagAPI = {
  async getAll () {
    const response = await axiosInstance.get('/tags')
    if (response.status == 200) {
      return response.data.data
    }
    return []
  },
  async saveNew (tag) {
    const response = await axiosInstance.post('/tags', tag)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  },
  async addTagNovel (tag_id,novel_id) {
    const response = await axiosInstance.put(`/tags/${tag_id}`, novel_id)
    if (response.status == 200) {
      return response.data
    }
    return {
      success: false
    }
  }
}

export const commentNovelAPI = {
  async getComment (novel_id) {
    const response = await axiosInstance.get(`/commentNovels/get/${novel_id}`)
    return response.data.data
  },
}

export const commentEpisodelAPI = {
  async getComment (episode_id) {
    const response = await axiosInstance.get(`/commentEpisodes/get/${episode_id}`)
    return response.data.data
  },
}

export const EpisodelAPI = {
  async getUser (episode_id,user) {
    const response = await axiosInstance.put(`/novels/episodes/${episode_id}`,user)

  },
}

export const novelAPI = {
  async getAll () {
    const response = await axiosInstance.get('/novels')
    if (response.status == 200) {
      return response.data.data
    }
    return []
  },
  async saveNew (novel) {
    const response = await axiosInstance.post('/novels', novel)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  }
}