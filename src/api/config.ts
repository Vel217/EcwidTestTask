import axios from 'axios'

export const API_CONFIG = {
  storeId: import.meta.env.VITE_STORE_ID || '108362264',
  token: import.meta.env.VITE_STORE_TOKEN || 'public_RiNvjTVVzKLhFNWyzR5fNY68u1GMHLEs',
  baseUrl: import.meta.env.VITE_STORE_URL || 'https://app.ecwid.com/api/v3'
}
const api = axios.create({
  baseURL: `${API_CONFIG.baseUrl}/${API_CONFIG.storeId}/`,
  timeout: 10000
})

api.interceptors.request.use(
  config => {
    config.headers?.set('Authorization', `Bearer ${API_CONFIG.token}`)

    return config
  },
  error => Promise.reject(error)
)

export default api
