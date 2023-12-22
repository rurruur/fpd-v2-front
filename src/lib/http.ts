import axios, { AxiosError } from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 60_000,
  withCredentials: true
})

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response

      return {
        status,
        message: (data as any).message || 'An error occurred'
      }
    }
    return Promise.reject(error)
  }
)

export default http
