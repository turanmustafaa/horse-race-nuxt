import axios from 'axios'

export default defineNuxtPlugin(() => {
  const instance = axios.create({
    baseURL: 'https://localhost:3001',
  })
  return {
    provide: {
      axios: instance
    }
  }
})
