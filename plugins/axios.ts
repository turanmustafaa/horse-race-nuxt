import axios from 'axios'

export default defineNuxtPlugin(() => {
  const instance = axios.create({
    baseURL: 'https://json-server-vercel-ten-pink.vercel.app',
  })
  return {
    provide: {
      axios: instance
    }
  }
})
